# GIT COMMIT MESSAGE CHEAT SHEET

**Proposed format of the commit message**

```
<type>(<scope>): <subject>

<body>
```

All lines are wrapped at 100 characters !


**Allowed `<type>`**

- feat (A new feature)
- fix (A bug fix)
- docs (Documentation only changes)
- style (Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc))
- perf (A code change that improves performance)
- refactor (A code change that neither fixes a bug nor adds a feature)
- test (Adding missing tests or correcting existing tests)
- build (Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm))
- ci (Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs))
- chore (Other changes that don't modify src or test files)
- revert (Reverts a previous commit)

**Allowed `<scope>`**
Scope could be anything specifying place of the commit change.

For example $location, $browser, compiler, scope, ng:href, etc...


**Breaking changes**
All breaking changes have to be mentioned in message body, on separated line:
​	_Breaks removed $browser.setUrl() method (use $browser.url(newUrl))_
​	_Breaks ng: repeat option is no longer supported on selects (use ng:options)_


**Message body**

- uses the imperative, present tense: “change” not “changed” nor “changes”
- includes motivation for the change and contrasts with previous behavior
