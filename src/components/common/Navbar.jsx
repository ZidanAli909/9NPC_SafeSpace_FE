import React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import safespace_logo from "../../assets/safespace_logo.svg?url"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Edit, History, LogOut, Settings, Menu, X } from "lucide-react"

function NavigationPublic({ navLinks }) {
  const navigate = useNavigate()

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.label}>
            {link.isDropdown ? (
              <>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-50 gap-1 p-2">
                    {link.subItems?.map((sub) => (
                      <li key={sub.title}>
                        <NavigationMenuLink
                          onClick={() => navigate(sub.href)}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 cursor-pointer"
                        >
                          <div className="text-sm font-medium">{sub.title}</div>
                          <p className="line-clamp-2 text-xs leading-snug text-slate-500">{sub.desc}</p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink
                onClick={() => navigate(link.href)}
                className={`${navigationMenuTriggerStyle()} cursor-pointer`}
              >
                {link.label}
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export function Navbar({ userMode = false }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = React.useState(() => {
    const saved = localStorage.getItem("user")
    return saved ? JSON.parse(saved) : null
  })
  const [menuOpen, setMenuOpen] = React.useState(false)

  const navLinks = userMode
    ? [
        { label: "Dashboard", href: "/" },
        { label: "Buat Laporan", href: "/report" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "Buat Laporan", href: "/report" },
        {
          label: "Bantuan",
          isDropdown: true,
          subItems: [
            { title: "Artikel Dukungan", href: "/artikel" },
            { title: "Info Bantuan Hukum", href: "/hukum" },
          ],
        },
        { label: "FAQ", href: "/faq" },
      ]

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FEFAF5] border-b">
      <div className="flex items-center justify-between p-4 px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold flex items-center gap-2">
          <img src={safespace_logo} alt="Safespace" width={40} height={40} />
          <span>Safespace</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationPublic navLinks={navLinks} />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/history")}>
                    <History className="mr-2 h-4 w-4" /> Riwayat Pelaporan
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Edit className="mr-2 h-4 w-4" /> Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" /> Pengaturan
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="px-6" onClick={() => navigate(location.pathname === "/login" ? "/signup" : "/login")}>
              {location.pathname === "/login" ? "Signup" : "Login"}
            </Button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.isDropdown ? (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-slate-900">{link.label}</p>
                  <div className="pl-4 border-l flex flex-col gap-2">
                    {link.subItems?.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => { navigate(item.href); setMenuOpen(false); }}
                        className="text-sm text-slate-600 py-1 text-left"
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { navigate(link.href); setMenuOpen(false); }}
                  className="text-sm font-medium block py-2 text-left w-full"
                >
                  {link.label}
                </button>
              )}
            </div>
          ))}
          {!user && (
            <Button
              className="w-full mt-2"
              onClick={() => { navigate(location.pathname === "/login" ? "/signup" : "/login"); setMenuOpen(false); }}
            >
              {location.pathname === "/login" ? "Signup" : "Login"}
            </Button>
          )}
        </div>
      )}
    </header>
  )
}