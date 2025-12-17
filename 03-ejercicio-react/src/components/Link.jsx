import { useRouter } from "../hooks/useRouter";

export function Link({ href, children, ...props }) {
  const { navigateTo } = useRouter();
  const handleClick = (event) => {
    event.preventDefault();
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
