var request = require('request');
var fs = require('fs');

var datafolder = 'src/assets/data/';
var releasefolder = 'src/assets/data/release/';

// TODO get user-info out of file

var auth = createAuth();
iterateRepos();

function createAuth() {
  var data = fs.readFileSync('config/githubBasicAuth.json', 'utf8');
  var basicAuth = JSON.parse(data);
  return 'Basic ' + new Buffer(basicAuth.username + ':' + basicAuth.token).toString("base64");
}

function iterateRepos() {
  fs.readFile('src/assets/configs/repositories.json', 'utf8', function(err, data) {
    var repos = JSON.parse(data);
    for (var i = 0; i < repos.length; i++) {
      var repoName = repos[i].name;
      fetchRepo(repoName);
      fetchLatestRelease(repoName);
    }
  });
}

function fetchRepo(name) {
  var options = createRequestOptions('https://api.github.com/repos/52North/' + name);
  request(options, function(error, response, body) {
    console.log('create data for repository: ' + name);
    fs.writeFile(datafolder + name + '.json', body);
  });
}

function fetchLatestRelease(name) {
  var options = createRequestOptions('https://api.github.com/repos/52North/' + name + '/releases/latest');
  request(options, function(error, response, body) {
    console.warn('create latest release for repository: ' + name);
    fs.writeFile(releasefolder + name + '.json', body);
  });
}

function createRequestOptions(url) {
  return {
    url: url,
    headers: {
      'User-Agent': '52NorthGithubIO',
      'Authorization': auth
    }
  }
}
