REM # Check out to a temporary branch:
git checkout --orphan TEMP_BRANCH

REM # Add all the files:
git add -A

REM # Commit the changes:
git commit -am "Initial commit"

REM # Delete the old branch:
git branch -D master

REM # Rename the temporary branch to master:
git branch -m master

REM # Finally, force update to our repository:
git push -f origin master