const fs = require('fs');
const { execSync } = require('child_process');
const output = execSync('git show HEAD~4:src/components/ContactSection.jsx').toString();
const beforeComponent = output.split('const ContactSection = () => {')[0];
fs.writeFileSync('temp_old_contact.txt', beforeComponent);
