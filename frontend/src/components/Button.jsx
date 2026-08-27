import { Link } from "react-router-dom";

/**
 * Reusable button. Renders a <Link> for internal routes, an <a> for
 * external URLs/downloads, or a <button> for actions/form submits.
 */
export default function Button({
  children,
  to,
  href,
  onClick,
  type = "button",
  variant = "primary", // primary | secondary | ghost
  size, // "sm" | undefined
  download,
  disabled,
  className = "",
  ...rest
}) {
  const classes = `btn btn-${variant} ${size ? `btn-${size}` : ""} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        download={download}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
