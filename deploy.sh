#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add *
git commit -m "heroku deployment-gitpages"
git push -f git@github.com:Akkarin007/play-Dog-web-app.git master:gh-pages

cd -