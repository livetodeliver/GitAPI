'use strict';

function getUserRepos() {
  fetch(`https://api.github.com/users/${ $('.userHandle').val() }/repos`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    // .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
  
    $('#results-list').empty();

    if (responseJson.message === 'Not Found') {
        $('.results').append("User Not Found");
    } else {
        $('#results-list').append(`<h2>Here are the public repos for ${ $('.userHandle').val() }</h2><ul>`);

        for (let i = 0; i < responseJson.length  ; i++) {
            $('#results-list ul').append(
                `<li><h3>${responseJson[i].name}</h3>
                <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p></li>` )
        } $('#results-list').append(`</ul>`);
    }
    $('#results-list').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getUserRepos();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});