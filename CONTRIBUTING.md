# Contributing to Google Sheets Telegram Notifier

Thank you for your interest in contributing to the Google Sheets Telegram Notifier! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### Prerequisites

- Google account with access to Google Apps Script
- Telegram account for testing
- Basic understanding of JavaScript and Google Apps Script
- Familiarity with Git and GitHub

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/google-sheets-telegram-notifier.git
   cd google-sheets-telegram-notifier
   ```

3. **Set up your development environment**
   - Install [clasp](https://github.com/google/clasp) for Google Apps Script development
   ```bash
   npm install -g @google/clasp
   ```

4. **Create a test Google Apps Script project**
   - Follow the setup guide in `examples/setup-guide.md`
   - Use test credentials and a test chat for development

## How to Contribute

### Reporting Issues

When reporting issues, please include:

1. **Clear description** of the problem
2. **Steps to reproduce** the issue
3. **Expected behavior** vs actual behavior
4. **Environment details**:
   - Google Apps Script runtime version
   - Browser used
   - Any error messages from logs

### Suggesting Features

For feature requests:

1. **Check existing issues** to avoid duplicates
2. **Describe the use case** and problem you're solving
3. **Provide examples** of how the feature would work
4. **Consider backward compatibility**

### Code Contributions

#### Types of Contributions Welcome

- **Bug fixes**: Fix issues in the existing code
- **Feature additions**: Add new functionality
- **Documentation improvements**: Enhance or clarify documentation
- **Examples**: Add new configuration examples or use cases
- **Tests**: Add or improve testing capabilities
- **Performance improvements**: Optimize existing code

#### Development Workflow

1. **Create a branch** for your work
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow the coding standards below
   - Add appropriate documentation
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: description of your changes"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use the PR template
   - Provide clear description of changes
   - Link to relevant issues

## Coding Standards

### JavaScript Style

- **Indentation**: 2 spaces
- **Semicolons**: Always use semicolons
- **Quotes**: Single quotes for strings
- **Naming**: camelCase for variables and functions
- **Constants**: UPPER_SNAKE_CASE for constants

### Documentation Standards

- **JSDoc comments** for all functions
- **Inline comments** for complex logic
- **README updates** for new features
- **API documentation** for public interfaces

### Example Code Style

```javascript
/**
 * Sends a notification with retry logic
 * 
 * @param {string} message - The message to send
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {boolean} Success status
 */
function sendNotificationWithRetry(message, maxRetries = 3) {
  const apiUrl = 'https://api.telegram.org';
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = UrlFetchApp.fetch(apiUrl, {
        method: 'POST',
        payload: JSON.stringify({ text: message })
      });
      
      if (response.getResponseCode() === 200) {
        return true;
      }
    } catch (error) {
      Logger.warn(`Attempt ${attempt} failed: ${error.message}`);
    }
  }
  
  return false;
}
```

## Testing Guidelines

### Manual Testing

1. **Test with different edit types**:
   - Text edits
   - Number edits
   - Formula changes
   - Cell deletions
   - Multiple cell edits

2. **Test configuration options**:
   - Different monitored ranges
   - Exclude ranges
   - Message format options
   - Error scenarios

3. **Test error handling**:
   - Invalid bot tokens
   - Network failures
   - API rate limiting
   - Malformed data

### Test Environment

- Use a **dedicated test spreadsheet**
- Set up a **test Telegram bot and chat**
- Use **test credentials** (never production)
- Enable **debug logging** during testing

## Documentation Guidelines

### Documentation Types

1. **Code Documentation**: JSDoc comments for all functions
2. **User Documentation**: README, setup guides, examples
3. **API Documentation**: Detailed function and configuration references
4. **Contributing Documentation**: This file and development guides

### Writing Style

- **Clear and concise** language
- **Step-by-step instructions** for procedures
- **Code examples** for technical concepts
- **Screenshots** for UI-related instructions
- **Links** to relevant resources

## Pull Request Guidelines

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Changes are tested manually
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No merge conflicts exist

### PR Description Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Tested manually with different edit types
- [ ] Tested error scenarios
- [ ] Verified configuration options work
- [ ] Documentation tested for accuracy

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

## Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

### Release Checklist

1. **Update version** in package.json
2. **Update CHANGELOG** with new features and fixes
3. **Test thoroughly** with various configurations
4. **Update documentation** as needed
5. **Create release notes** with migration guide if needed

## Getting Help

### Resources

- **Documentation**: Check the `docs/` directory
- **Examples**: Look at configuration examples
- **Issues**: Search existing GitHub issues
- **Discussions**: Use GitHub Discussions for questions

### Contact

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: [Contact information if applicable]

## Recognition

Contributors will be recognized in:
- **README**: Contributors section
- **Release notes**: Acknowledgment of contributions
- **GitHub**: Contributor graphs and statistics

Thank you for helping improve the Google Sheets Telegram Notifier!