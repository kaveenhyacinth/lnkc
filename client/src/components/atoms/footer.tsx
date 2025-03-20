export const Footer = () => {
  return (
    <footer className="w-full h-10 flex flex-col justify-end">
      <p className="font-montserrat text-sm text-center md:text-left">
        © {new Date().getFullYear()} <a href="https://kaveenhyacinth.com" target="_blank">Kaveen Hyacinth</a>. All Rights Reserved.
      </p>
    </footer>
  )
}