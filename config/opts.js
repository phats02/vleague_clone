var opts = {}
opts.jwtFromRequest = function(req) {
    var token = null;
    if (req && req.cookies)
    {
        token = req.cookies['jwt'];
    }
    return token;
};
opts.secretOrKey = 'secret';

module.exports=opts