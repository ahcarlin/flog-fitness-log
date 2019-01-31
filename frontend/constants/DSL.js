var log = `
  Squat 
  135*5
  225*3
  315*2
  365*1
  405
  365*3*3

  Bench Press

  185*20

  Pull-Up
  BW*10
  BW+45*5
  %+90*3
  Plank
  BW*60s
  %+45/30*2

  Biceps Curl /20
  80*13
  80*3*5
`
export const parseWorkout = (log) => {
  var lineArray = log.split('\n').filter(line => line.length > 0).map(line => line.trim())

  let liftsIdx = (arr) => {
    var indices = [], i;
    for(i=0; i< arr.length; i++) {
      if ((arr[i].charAt() !== '-' && !arr[i].charAt().match(/\d/)) && !arr[i].includes('*')) {
        indices.push(i);
      }
    }
    return indices
  }
  
  let lifts = liftsIdx(lineArray)

  let slicedLifts = (arr1, arr2) => {
    var myLifts = [], i;
    for(i=0; i<arr2.length; i++) {
      myLifts.push(arr1.slice(arr2[i], arr2[i+1]))
    }
    return myLifts
  }
  
  var liftsArray = slicedLifts(lineArray, lifts)
  
  let liftArrayToObjects = (liftArray) => {
    var liftObjArr = [], i;
    for (i=0; i<liftArray.length; i++) {
      liftObjArr.push(Object.assign({liftName: liftArray[i][0], data: liftArray[i].slice(1)}))
    }
    return liftObjArr
  }
  let almostThere = liftArrayToObjects(liftsArray)

  let dataArrayToObjects = (liftObjArr) => {
    var exercisesToday = []
    liftObjArr.map(obj => {
      let liftData = []
      let exercise = obj["liftName"]
      obj["data"].map(line => {
        var chunk = {}
        var linArr = line.split("*")
        if(linArr.length == 3) { 
          chunk.weight = linArr[0]
          chunk.reps = linArr[1]
          chunk.sets = linArr[2]
      } else if (linArr.length == 2){
          chunk.weight = linArr[0]
          chunk.reps = linArr[1]
          chunk.sets = "1"
      } else {
          chunk.weight = linArr[0]
          chunk.reps = "1" 
          chunk.sets = "1"
      }
      liftData.push(chunk)
    })
    exercisesToday.push(Object.assign({}, {exercise: exercise}, {data: liftData}))
    })
    return exercisesToday
  };

  return dataArrayToObjects(almostThere)
}
