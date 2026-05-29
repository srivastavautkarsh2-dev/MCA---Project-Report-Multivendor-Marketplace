import React from "react";

import StarRating from "react-star-ratings"

export const ShowAverage = (p) => {
    if (p && p.ratings) {
        let ratingsArray = p && p.ratings;
        let total = [];
        let length = ratingsArray.length
      //  console.log("length",length)
        //console.log("ratingsArray",ratingsArray)

        ratingsArray.map((r) =>
            total.push(r.star))
      //      console.log("ratingArray123",ratingsArray)
        let totalReduced = total.reduce((p, n) => (p+n),0)
      //  console.log(p)
      //  console.log('totalReaduced', totalReduced)
        let highest=length*5;
      //  console.log("highest",highest)
        let result=(totalReduced*5)/highest;
      //  console.log("result",result)

        return(
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating  
                    starDimension="20px" 
                    starSpacing="2px" 
                    starRatedColor="red" 
                    rating={3.5} 
                    editing={false} />
                {" "}
                ({3.5})
            
                </span>

            </div>
        )
    }
}