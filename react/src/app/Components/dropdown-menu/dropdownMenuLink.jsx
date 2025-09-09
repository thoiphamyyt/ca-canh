function DropdownMenuLink({ href, children }) {
  return (
    <DropdownMenuItem
      asChild
      className="hover:bg-transparent focus:bg-transparent p-2"
    >
      <Link href={href} className="flex items-center gap-1 hover:text-green-600">
        {children}
      </Link>
    </DropdownMenuItem>
  );
}