const redis = require('redis')

// Middleware to check if the user is authenticated and has the admin role
const isAdmin = async (req, res, next) => {
    const { username } = req.body;
    const redisClient = redis.createClient();
    redisClient.get(username, (err, role) => {
        if (err) {
            console.error('Error retrieving user details from Redis:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else if (role === 'admin') {
            next(); // User is admin, proceed to next middleware
        } else {
            res.status(403).json({ error: 'Access denied. User is not an admin' });
        }
    });
    redisClient.quit();
};

function validateToken(req, res, next){

    const token = req.headers["authorization"].split(" ")[1];
     console.log("validate token",token);

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
      }
      jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
    
        try {
          // Fetch user details from the database using the decoded userId
          const user = await User.findById(decoded.userId);
         console.log("Fetching user details",user);
          if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
          }
    
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });
      
      jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    try {
      // Fetch user details from the database using the decoded userId
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized - User not found' });
      }

      // Attach user information to the request object for use in subsequent middleware or routes
      req.user = user;

      // Token is valid - continue with the next middleware or route
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

}
module.exports = {isAdmin,validateToken};