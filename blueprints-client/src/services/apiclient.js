// apiclient.js
import $ from 'jquery';

const apiclient = {
  getBlueprintsByAuthor: (author) => {
    return new Promise((resolve, reject) => {
      $.get(`http://localhost:8080/blueprints/${author}`, (data) => {
        resolve(data);
      }).fail((jqXHR, textStatus, errorThrown) => {
        reject(new Error(`Error: ${textStatus}`));
      });
    });
  },

  getBlueprintsByNameAndAuthor: (author, blueprintName) => {
    return new Promise((resolve, reject) => {
      $.get(`http://localhost:8080/blueprints/${author}/${blueprintName}`, (data) => {
        resolve(data);
      }).fail((jqXHR, textStatus, errorThrown) => {
        reject(new Error(`Error: ${textStatus}`));
      });
    });
  },
};

export default apiclient;
