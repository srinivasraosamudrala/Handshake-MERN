const findDocumentsByQuery = async (modelObject, query, options, callback) => {
    try {
        modelObject.find(query, options,(err,result)=>{callback(err,result)}).lean();
    } catch (error) {
        callback(err,null)
    }
}
const saveDocuments = (modelObject, result,options,callback) => {
    try {
        let model = new modelObject(result,options);
        console.log(model)
        model.save(options,(err, result)=>{
            if (result){
                console.log(result)
                callback(err,result)
            }
            else if (err){
                console.log(err)
                callback(err,null)
            }
        });
    } catch (error) {
        console.log(`Error while saving data: ${error}`)
        callback(err,null)
    }
}
const updateField = (modelObject, id, update, callback) => {
    console.log("update")
    try {
        modelObject.findOneAndUpdate({ _id  : id}, update, { useFindAndModify: false, new:true},(err,result)=>{
            if (result){
                console.log(result)
                callback(err,result)
            }
            else if (err){
                console.log(err)
                callback(err,null)
            }
        });
    } catch (error) {
        console.log("Error while updating data:" + error)
        callback(err,null)
    }
}

// router.get('/getstudentsappliedtoevent', (req, res) => {
// const lookup = (modelObject,collection,)
//     const agg = [
//       {
//         $lookup:
//           {
//             from: collection,
//             localField: '_Id',
//             foreignField: 'registrations.studentid',
//             as: 'event_studentdetails',
//           },
//       },
//     ];
//     modelObject.aggregate(agg).exec((err, result) => {
//       if (err) {
//         console.log(err);
//         return res.status(404).send(err);
//       }
//       console.log('success');
//       res.status(200).send(result);
//     });
//   });

module.exports.findDocumentsByQuery = findDocumentsByQuery;
module.exports.saveDocuments = saveDocuments;
module.exports.updateField = updateField;