class Circle {
    constructor(x, y, r) { 
        this.x = x;
        this.y = y;
        this.r = r;
    }

    isOverlapping(circle) {
        const {x: x2, y: y2, r: r2} = circle; 
        const centersDistanceSum = Math.pow(this.x - x2, 2) + Math.pow(this.y - y2, 2); 
        const radiusesSum = Math.pow(this.r + r2, 2); 

        return (centersDistanceSum < radiusesSum) ? true : false;
    }  
}

class CircleStore {
    constructor() {
        this.circles = new Map();
    }

    addCircle(circleToAdd) {
        const overlappingCircles = [];

        this.circles.forEach(({c,arr},key) => {
            if(c.isOverlapping(circleToAdd)) {
                overlappingCircles.push(c);
                arr.push(circleToAdd);
            } 
        });
        
        this.circles.set(JSON.stringify(circleToAdd), {c: circleToAdd, arr: overlappingCircles});
    }

    getOverlapingCircles(circle) {
        const overlappingCircles = this.circles.get(JSON.stringify(circle));
        if(overlappingCircles) {
            return [circle,...overlappingCircles.arr];
        } else {
            overlappingCircles = [];
            this.circles.forEach((arr,c) => {
                if(c.isOverlapping(circle)) {
                    overlappingCircles.push(c);
                }
            });
            return overlappingCircles;
        }
    }   
}
