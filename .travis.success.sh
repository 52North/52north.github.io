#!/bin/bash -e

[ "${TRAVIS_JOB_NUMBER}" != "${TRAVIS_BUILD_NUMBER}.1" ] && exit 0
[ "$TRAVIS_PULL_REQUEST" != "false" ] && exit 0

github_name="Travis CI"
github_mail="travis@travis-ci.org"
branch="master"
deploy_dir=$(mktemp -d)
repo_url="https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git"

git config --global user.name "${github_name}"
git config --global user.email "${github_mail}"
git clone --quiet --depth 1 --branch "${branch}" https://github.com/${TRAVIS_REPO_SLUG}.git "${deploy_dir}"

echo "clear folder"
rm -rfv "${deploy_dir}"/*

echo "copy builded client"
cp -rv dist/* "${deploy_dir}/"

pushd "${deploy_dir}"
git add --ignore-removal .
git add --update :/
git status
git commit -m "Updating ${TRAVIS_BRANCH} on ${branch} to ${TRAVIS_COMMIT}"
git push --force "${repo_url}" "${branch}"
popd
