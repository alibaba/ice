name: Bug Report
description: Report ice.js, documents and other issues
labels: bug
body:
  - type: textarea
    id: description
    attributes:
      label: Describe the bug
      description: |
        If the current behavior is a bug, please provide the steps to reproduce and if possible a minimal demo of the problem.
        清晰的描述遇到的问题，并建议附上错误截图。
    validations:
      required: true
  - type: textarea
    id: expected-behavior
    attributes:
      label: Expected behavior
      description: |
        A clear and concise description of what you expect to happen.
        描述您希望的正常表现。
    validations:
      required: true
  - type: textarea
    id: actual-behavior
    attributes:
      label: Actual behavior
      description: |
        A clear and concise description of actual behavior.
        请清晰、简洁地描述您的实际表现。
    validations:
      required: false
  - type: input
    id: version
    attributes:
      label: Version of ice.js
    validations:
      required: true
  - type: textarea
    id: build-config
    attributes:
      label: Content of build.json or ice.config.mts
    render: TypeScript
  - type: textarea
    id: addition
    attributes:
      label: Additional context
      placeholder: Add any other context about the problem here. 添加其它关于此问题的描述。
