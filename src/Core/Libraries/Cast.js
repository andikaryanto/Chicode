class Cast {

     static to(value, type){
          switch (type) {
               case "boolean" : 
                    return Boolean(value);
          }
     }
}

export default Cast;