import * as React from "react";

interface EmailTemplateProps {
  password: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  password,
}) => (
  <div>
    <p>Looks like you forgot your password.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Your password has been reset to: {password}</p>
  </div>
);
