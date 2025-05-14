'use strict';

module.exports = function (app) {
  
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const Schema = mongoose.Schema;
  const IssueSchema = new Schema({
    issue_title: { type: String, required: true },
    issue_text: { type: String, required: true },
    created_by: { type: String, required: true },
    assigned_to: String || "",
    status_text: String || "",
    updated_on: Date,
    created_on: Date,
    open: Boolean,
    name: String
  });
  const Issue = mongoose.model("Issue", IssueSchema);


  app.route('/api/issues/:project')
  
    .get(async(req, res) => {
      const projectName = req.params.project;
      const filters = req.query;
      try{
        const projectIssues = await Issue.find({ name: projectName, ...filters });
        res.json(projectIssues);
      } catch(error){
        console.error(error);
      }
    })
    
    .post(async(req, res) => {
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      if (!issue_title || !issue_text || !created_by){
        res.json({ error: 'required field(s) missing' });
      } else {
        const issue = new Issue({
          issue_title: issue_title,
          issue_text: issue_text,
          created_by: created_by,
          assigned_to: assigned_to || "",
          status_text: status_text || "",
          updated_on: new Date(),
          created_on: new Date(),
          open: true,
          name: project
        });
        const newIssue = await issue.save();
        res.json({
          _id: newIssue._id,
          issue_title: newIssue.issue_title,
          issue_text: newIssue.issue_text,
          created_by: newIssue.created_by,
          assigned_to: newIssue.assigned_to,
          status_text: newIssue.status_text,
          created_on: newIssue.created_on,
          updated_on: newIssue.updated_on,
          open: newIssue.open
        });
      }
    }
    )
    
    .put(async(req, res) => {
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body;
      if (!_id){
        res.json({ error: 'missing _id' });
      } else {
        if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text && !open){
          res.json({ error: 'no update field(s) sent', '_id': _id });
        } else {
          try{
            const updateIssues = await Issue.findByIdAndUpdate(_id, {
              $set: {
                issue_title: issue_title,
                issue_text: issue_text,
                created_by: created_by,
                assigned_to: assigned_to,
                status_text: status_text,
                updated_on: new Date(),
                open: open
              }
            }, { new: true });
            console.log(updateIssues)
            if(!updateIssues){
              res.json({ error: 'could not update', '_id': _id });
            } else {
              res.json({  result: 'successfully updated', '_id': _id });
            }
          } catch(error){
            console.error(error);
          }
        }
      }
    })
    
    .delete(async(req, res) => {
      const { _id } = req.body;
      if (!_id){
        res.json({ error: 'missing _id' });
      } else {
        try{
          const deleteIssues = await Issue.findByIdAndDelete(_id);
          if(!deleteIssues){
            res.json({ error: 'could not delete', '_id': _id });
          } else {
            res.json({  result: 'successfully deleted', '_id': _id });
          }
        } catch(error){
          console.error(error);
        }
      }
    });
    
};
