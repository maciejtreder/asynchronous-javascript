class Glass {
    constructor(glassId, level) {
        this.GlassId = glassId;
        this.fillLevel = level;
    }
}
 
function fillGlass(pourtime) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let level = Math.random();
            if (level >= 0.7) {
                resolve(Math.round(level * 100));
            } else {
		reject(new Error('Missed the glass!'));
            }
        }, pourtime);
    });
}
 
function serveGlass(curGlass, result) {
    console.log(`That's a good pour! Glass ${curGlass.GlassId} is ${result}% full. Drink up.`);
}
 
function returnGlass(curGlass, errorMsg) {
    console.log(`That's a bad pour. Glass ${curGlass.GlassId} ${errorMsg} Try again.`);
}
 
function pour(ordered, pourtime) {
    let attempted = 1;
    while (attempted <= ordered) {
        let curGlass = new Glass(attempted);
        fillGlass(pourtime)
            .then(result => serveGlass(curGlass, result))
            .catch(errorMsg => returnGlass(curGlass, errorMsg));
        attempted++;
    }
}
 
pour(10, 500);

