var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
// var data = [
//     {
//       name: "Cloud's rest",
//       image: "https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg",
//       description: "Lorem ipsum dolor sit amet, ex sit possim efficiendi consequuntur, ubique euripidis te est. Magna solum assueverit eu vim. Praesent accusamus hendrerit cu quo. Latine bonorum pericula duo ea, ex mea putant voluptaria. Ne nam etiam voluptua praesent, vitae tantas eum te, oporteat adolescens dissentias mea ex. Ad porro nihil primis duo. Ut mazim nominavi offendit est."
//     },
//     {
//       name: "Desert Mesa",
//       image: "https://cdn.pixabay.com/photo/2017/08/04/20/04/camping-2581242__340.jpg",
//       description: "Lorem ipsum dolor sit amet, ex sit possim efficiendi consequuntur, ubique euripidis te est. Magna solum assueverit eu vim. Praesent accusamus hendrerit cu quo. Latine bonorum pericula duo ea, ex mea putant voluptaria. Ne nam etiam voluptua praesent, vitae tantas eum te, oporteat adolescens dissentias mea ex. Ad porro nihil primis duo. Ut mazim nominavi offendit est."
//     },
//     {
//       name: "Violet Hill",
//       image: "https://cdn.pixabay.com/photo/2017/05/24/05/00/tent-2339491__340.jpg",
//       description: "Lorem ipsum dolor sit amet, ex sit possim efficiendi consequuntur, ubique euripidis te est. Magna solum assueverit eu vim. Praesent accusamus hendrerit cu quo. Latine bonorum pericula duo ea, ex mea putant voluptaria. Ne nam etiam voluptua praesent, vitae tantas eum te, oporteat adolescens dissentias mea ex. Ad porro nihil primis duo. Ut mazim nominavi offendit est."
//     }
//   ];

function seedDB() {
  //REMOVE ALL CAMPGROUNDS
  Campground.remove({}, function(err){
    if(err) {
    console.log(err);
    }
    console.log("removed campgrounds");
    //ADD FEW CAMPGROUNDS
    // data.forEach(function(seed){
    //   Campground.create(seed, function(err, campground){
    //     if(err) {
    //       console.log(err);
    //     } else {
    //       console.log("added campground");
    //       //CREATE COMMENT
    //       Comment.create(
    //         {
    //           text: "This place is great, I wish there was internet",
    //           author:"Homer"
    //       }, function(err, comment){
    //         if(err){
    //           console.log(err);
    //         } else {
    //           campground.comments.push(comment._id);
    //           campground.save();
    //           console.log("created new comment");
    //         }
    //       });
    //     }
    //   });
    // });
  });
}

module.exports = seedDB;