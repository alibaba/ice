name: RFC Discussion
description: To submit a feature request or a proposal, follow the RFC process.
labels: rfc
body:
  - type: textarea
    id: summary
    attributes:
      label: Summary | 概述
      placeholder: Optional, brief explanation of the feature.
  - type: textarea
    id: motivation
    attributes:
      label: Motivation | 背景
      placeholder: Why are we doing this? What use cases does it support? What is the expected
outcome?
    validations:
      required: true
  - type: textarea
    id: example
    attributes:
      label: Usage example | 使用示例
      placeholder: If the proposal involves a new or changed API, include a basic code example.
Omit this section if it's not applicable.
  - type: textarea
    id: design
    attributes:
      label: Detailed design | 方案设计
      placeholder: |
        This is the bulk of the RFC. Explain the design in enough detail for somebody
familiar with React to understand, and for somebody familiar with the
implementation to implement. This should get into specifics and corner-cases,
and include examples of how the feature is used. Any new terminology should be
defined here.
    validations:
      required: true
  - type: textarea
    id: addition
    attributes:
      label: Additional context | 额外信息
      placeholder: What parts of the design are still
to be done? Add any other context about this feature here. 
