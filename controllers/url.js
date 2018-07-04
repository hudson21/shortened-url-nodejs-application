'use strict'
const Hashids = require('hashids');
const jwt = require('jsonwebtoken');

/*As in the requirements said I could not use a database system I saved all on this array bellow
 that always initializes when the server is restarted again (applied as the payload)*/

 /*I implemented this array as the payload*/ 
const urls = [];

function getShorthand(req, res){
    jwt.verify(req.token, 'my_secret_key', function(err, data) {
        if (err) {
            return res.status(403).send({
                message:'The token has not been provided correctly :('
            });
        }else {
           if(req.params.id){
                var shorthandId = req.params.id;
                
                const result = urls.filter( url => url.shorthand == shorthandId);
          
                  if(result.length == 1){
                      function buscar(arreglo) { 
                          return arreglo.shorthand === shorthandId;
                      }
          
                      var query = urls.find(buscar);
                      return   res.status(200).send({original_url: query['original_url']});
          
                  }else{
                    return res.status(404).send({
                          message:'Your shorthand has not been found :('
                      })
                  
                  }
              
            }else{
                return res.status(200).send({
                    message:'You should provide a shortHand :O'
                });
              }
        }
    });

}

function saveShortHand(req, res){

    jwt.verify(req.token, 'my_secret_key', function(err, data) {
        if (err) {
            return res.status(403).send({
                message:'The token has not been provided correctly :('
            });
        }else {
            var params = req.body;

    if(params.shorthand && params.original_url){
        const result = urls.filter( url => url.shorthand == params.shorthand);

        if(result.length == 1){
            return  res.status(409).send({message:'The shorthand typed already exists :('});

        }else{
            urls.push({
            shorthand: params.shorthand,
            original_url: params.original_url
            });
            return res.status(201).send({
                shorhand:params.shorthand,
                message:'The shorthand has been saved successfully :)'
            })
        }    
    }

    if(!params.shorthand && params.original_url){
       
        var hashids = new Hashids();
        var shorthand = hashids.encode((new Date).getTime());

        urls.push({
            shorthand: shorthand,
            original_url: params.original_url
        });

        return  res.status(201).send({
            shorhand:shorthand,
            message:'The shorthand has been saved successfully :)'
        });
        
    }

    if(!params.shorthand && !params.original_url){
        return  res.status(200).send({message:'You should fill at least  the field of original_url :('})
    }

    if(!params.original_url){
        return  res.status(200).send({message:'You should fill the field of original_url :('})
    }
  }
 });
}

function user(req, res){
  const user = { id: 3 };
  const token = jwt.sign({ user: user.id }, 'my_secret_key');
  res.json({
    token: token
  });
}

module.exports = {
    getShorthand,
    saveShortHand,
    user
}