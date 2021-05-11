#!/usr/bin/env zsh
RED='\033[0;31m'
WARN='\033[0;33m'
NC='\033[0m' # No Color
main_branch="dev"
current_branch=$(git branch | grep \* | cut -d ' ' -f2)
warning_mainbranch=0
if [[ ${current_branch} == ${main_branch} ]]
then
    warning_mainbranch=1
else
    echo "### Fetching ${main_branch} and checking if rebase is needed"
    git fetch origin ${main_branch}:${main_branch}
    hash1=$(git show-ref --heads -s ${main_branch})
    hash2=$(git merge-base ${main_branch} "$current_branch")
    if [[ "${hash1}" != "${hash2}" ]]
    then
        echo "Rebase is required first !"
        exit 1
    fi
fi

set -e
echo "### LINT"
yarn run lint
echo "### TESTS CYPRESS"
#yarn run test:cy



if [[ $warning_mainbranch == 1 ]]
then
  echo "${RED}!!BE AWARE!! Git current branch SHOULD NOT BE '$main_branch'"
else
  echo "Everything is OK, Well done! Go go go push this!!"
fi
