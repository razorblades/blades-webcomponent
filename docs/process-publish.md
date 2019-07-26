# Steps to update

1. Write CHANGELOG.md
3. git commit  using the CHANGELOG
4. git tag using the version
5. git push
6. git push --tags

CI/CD Job will publish on new tag, project.json version attribute will be overwritten during build with current tag.