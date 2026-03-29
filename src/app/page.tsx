"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
  Cake,
  Utensils,
  Coffee,
  Heart,
  Sparkles,
  Leaf,
  Home,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const WHATSAPP_URL =
  "https://wa.me/18095714929?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20una%20reservaci%C3%B3n%20en%20Dolci%20e%20Sapori";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Menú", href: "#menu" },
  { label: "Galería", href: "#galeria" },
  { label: "Contacto", href: "#contacto" },
];

const PASTELES = [
  {
    name: "Tiramisú",
    description: "Capas de bizcocho empapado en café, crema mascarpone y cacao",
    price: "RD$ 450",
    image: "/images/menu/tiramisu.png",
  },
  {
    name: "Cannoli Siciliano",
    description: "Cáscara crujiente rellena de ricotta dulce con pistachos",
    price: "RD$ 280",
    image: "/images/menu/cannoli.png",
  },
  {
    name: "Panna Cotta",
    description: "Crema italiana sedosa con salsa de frutos rojos frescos",
    price: "RD$ 380",
    image: "/images/menu/panna-cotta.png",
  },
  {
    name: "Cheesecake",
    description: "Cheesecake cremoso con base de galleta y coulis de frutas",
    price: "RD$ 420",
    image: "/images/menu/cheesecake.png",
  },
  {
    name: "Tarta de Frutas",
    description: "Masa quebrada con crema pastelera y frutas frescas de temporada",
    price: "RD$ 480",
    image: "/images/menu/tarta-frutas.png",
  },
  {
    name: "Brownie",
    description: "Brownie de chocolate intenso con nueces y helado de vainilla",
    price: "RD$ 320",
    image: "/images/menu/brownie.png",
  },
];

const PLATOS = [
  {
    name: "Pasta Alfredo",
    description: "Fettuccine en cremosa salsa de parmesano y mantequilla",
    price: "RD$ 650",
    image: "/images/menu/pasta-alfredo.png",
  },
  {
    name: "Lasagna Bolognese",
    description: "Capas de pasta con ragú de carne, bechamel y mozzarella",
    price: "RD$ 720",
    image: "/images/menu/lasagna.png",
  },
  {
    name: "Pollo Parmigiana",
    description: "Pechuga empanizada con salsa marinara, mozzarella gratinada",
    price: "RD$ 680",
    image: "/images/menu/pollo-parmigiana.png",
  },
  {
    name: "Risotto",
    description: "Arroz cremoso con hongos porcini, parmesano y trufa",
    price: "RD$ 750",
    image: "/images/menu/risotto.png",
  },
  {
    name: "Bruschetta",
    description: "Pan tostado con tomates frescos, albahaca y aceite de oliva",
    price: "RD$ 320",
    image: "/images/menu/bruschetta.png",
  },
  {
    name: "Ensalada Caprese",
    description: "Mozzarella fresca, tomate, albahaca y reducción balsámica",
    price: "RD$ 480",
    image: "/images/menu/ensalada-caprese.png",
  },
];

const DESAYUNOS = [
  {
    name: "Cappuccino",
    description: "Espresso con leche vaporizada y espuma cremosa artesanal",
    price: "RD$ 220",
    image: "/images/menu/cappuccino.png",
  },
  {
    name: "Espresso",
    description: "Shot concentrado de café italiano de grano seleccionado",
    price: "RD$ 150",
    image: "/images/menu/espresso.png",
  },
  {
    name: "Latte",
    description: "Espresso suave con abundante leche vaporizada y arte latte",
    price: "RD$ 250",
    image: "/images/menu/latte.png",
  },
  {
    name: "Croissant",
    description: "Croissant francés hojaldrado, recién horneado y dorado",
    price: "RD$ 180",
    image: "/images/menu/croissant.png",
  },
  {
    name: "Tostada Italiana",
    description: "Pan artesanal con tomate, prosciutto, mozzarella y rúcula",
    price: "RD$ 420",
    image: "/images/menu/tostada-italiana.png",
  },
  {
    name: "Panini",
    description: "Sándwich caliente italiano con jamón, queso y pesto",
    price: "RD$ 380",
    image: "/images/menu/panini.png",
  },
];

const GALLERY_IMAGES = [
  { src: "/images/hero-bakery.png", alt: "Fachada del restaurante" },
  { src: "/images/cakes-display.png", alt: "Pasteles y postres" },
  { src: "/images/food-dishes.png", alt: "Platos principales" },
  { src: "/images/restaurant-interior.png", alt: "Interior acogedor" },
  { src: "/images/coffee-breakfast.png", alt: "Café y desayuno" },
];

// ─── Animation Wrapper ────────────────────────────────────────────────────────

function FadeInWhenVisible({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3">
            <Image
              src="/images/logo-restaurant.png"
              alt="Dolci e Sapori Logo"
              width={50}
              height={50}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"
            />
            <span
              className={`font-serif text-lg sm:text-xl font-bold transition-colors ${
                scrolled ? "text-stone-900" : "text-white"
              }`}
            >
              Dolci e Sapori
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-white/20 ${
                  scrolled
                    ? "text-stone-700 hover:bg-stone-100"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="ml-3 rounded-full bg-[#D4A574] text-white hover:bg-[#c49564] font-semibold"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Reservar
              </a>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    scrolled ? "text-stone-900" : "text-white"
                  }`}
                  aria-label="Abrir menú"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-white p-0">
                <SheetHeader className="p-6 bg-[#FFF8F0]">
                  <SheetTitle className="flex items-center gap-3 text-[#8B2252]">
                    <Image
                      src="/images/logo-restaurant.png"
                      alt="Logo"
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <span className="font-serif">Dolci e Sapori</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 p-4">
                  {NAV_LINKS.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-stone-700 hover:bg-[#FFF8F0] transition-colors font-medium"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                  <Separator className="my-2" />
                  <SheetClose asChild>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Reservar Mesa
                    </a>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bakery.png"
          alt="Dolci e Sapori Restaurante"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Badge
            variant="outline"
            className="mb-6 border-[#D4A574]/60 text-[#D4A574] px-4 py-1.5 text-sm backdrop-blur-sm bg-white/5"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Italiano-Caribeño
          </Badge>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
            Dolci e Sapori
          </h1>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#D4A574] mb-6 font-light italic">
            Cake &amp; Kitchen
          </p>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light">
            Sabores italianos con alma caribeña en Sosúa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#D4A574] text-white hover:bg-[#c49564] px-8 h-12 text-base font-semibold"
            >
              <a href="#menu">Ver Menú</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/40 text-white hover:bg-white/10 hover:text-white px-8 h-12 text-base backdrop-blur-sm"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                Reservar Mesa
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a
            href="#nosotros"
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors"
          >
            <span className="text-xs tracking-widest uppercase">Descubre</span>
            <ChevronDown className="h-5 w-5 animate-bounce-scroll" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  const features = [
    {
      icon: Cake,
      title: "Pasteles Artesanales",
      desc: "Elaborados diariamente con recetas tradicionales italianas",
    },
    {
      icon: Utensils,
      title: "Cocina Italiana Auténtica",
      desc: "Platos tradicionales con los mejores ingredientes importados",
    },
    {
      icon: Leaf,
      title: "Ingredientes Frescos",
      desc: "Productos locales de la RD combinados con lo mejor de Italia",
    },
    {
      icon: Heart,
      title: "Ambiente Acogedor",
      desc: "Un espacio where la familia y los amigos se reúnen con gusto",
    },
  ];

  return (
    <section id="nosotros" className="py-20 sm:py-28 bg-[#FFF8F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <FadeInWhenVisible>
              <p className="text-[#D4A574] font-semibold text-sm tracking-widest uppercase mb-3">
                Nuestra Historia
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-6">
                Sobre Nosotros
              </h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  En el corazón de Sosúa, República Dominicana, nace{" "}
                  <span className="font-semibold text-[#8B2252]">
                    Dolci e Sapori
                  </span>{" "}
                  — un rincón donde la tradición gastronómica italiana se funde
                  con la calidez caribeña. Cada plato que sale de nuestra cocina
                  cuenta una historia de pasión, dedicación y amor por los
                  sabores auténticos.
                </p>
                <p>
                  Nuestra pastelería artesanal es el alma del local: desde el
                  clásico tiramisú hasta nuestros exclusivos cannoli sicilianos,
                  cada creación es elaborada diariamente con ingredientes
                  seleccionados y recetas transmitidas por generaciones.
                </p>
                <p>
                  Ya sea que vengas por un café matutino, un almuerzo en familia
                  o una cena romántica, en Dolci e Sapori encontrarás una
                  experiencia culinaria que combina lo mejor de dos mundos.
                </p>
              </div>
            </FadeInWhenVisible>

            {/* Rating */}
            <FadeInWhenVisible delay={0.2} className="mt-8">
              <div className="inline-flex items-center gap-3 bg-white rounded-xl px-6 py-4 shadow-sm border border-[#D4A574]/20">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-yellow-400 fill-yellow-400"
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-lg">4.7/5</p>
                  <p className="text-xs text-stone-500">
                    Basado en reseñas de Google
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Image */}
          <FadeInWhenVisible delay={0.3}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/restaurant-interior.png"
                  alt="Interior del restaurante"
                  width={600}
                  height={500}
                  className="w-full h-[400px] sm:h-[500px] object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-[#8B2252] text-white rounded-xl px-5 py-3 shadow-lg">
                <p className="font-serif text-2xl font-bold">10+</p>
                <p className="text-sm text-white/80">Años de tradición</p>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 sm:mt-20">
          {features.map((feature, i) => (
            <FadeInWhenVisible key={feature.title} delay={0.1 * i}>
              <Card className="bg-white border-[#D4A574]/10 hover:border-[#D4A574]/30 hover:shadow-md transition-all py-6 gap-4 group">
                <CardContent className="flex flex-col items-center text-center gap-3 px-4">
                  <div className="w-14 h-14 rounded-full bg-[#D4A574]/10 flex items-center justify-center group-hover:bg-[#D4A574]/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-[#D4A574]" />
                  </div>
                  <h3 className="font-semibold text-stone-900 text-base">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Menu Section ─────────────────────────────────────────────────────────────

function MenuSection() {
  return (
    <section id="menu" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-12">
          <p className="text-[#D4A574] font-semibold text-sm tracking-widest uppercase mb-3">
            Nuestras Especialidades
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            Nuestro Menú
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Descubre nuestra selección de pasteles artesanales, platos
            italianos auténticos y deliciosos desayunos preparados con amor.
          </p>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <Tabs defaultValue="pasteles" className="w-full">
            <TabsList className="mx-auto flex h-auto p-1 bg-stone-100 rounded-full mb-10">
              <TabsTrigger
                value="pasteles"
                className="rounded-full px-4 sm:px-6 py-2.5 text-sm data-[state=active]:bg-[#D4A574] data-[state=active]:text-white gap-2"
              >
                <Cake className="h-4 w-4" />
                <span className="hidden sm:inline">Pasteles &amp; Postres</span>
                <span className="sm:hidden">Pasteles</span>
              </TabsTrigger>
              <TabsTrigger
                value="platos"
                className="rounded-full px-4 sm:px-6 py-2.5 text-sm data-[state=active]:bg-[#8B2252] data-[state=active]:text-white gap-2"
              >
                <Utensils className="h-4 w-4" />
                <span className="hidden sm:inline">Platos Principales</span>
                <span className="sm:hidden">Platos</span>
              </TabsTrigger>
              <TabsTrigger
                value="desayunos"
                className="rounded-full px-4 sm:px-6 py-2.5 text-sm data-[state=active]:bg-stone-800 data-[state=active]:text-white gap-2"
              >
                <Coffee className="h-4 w-4" />
                <span className="hidden sm:inline">Desayunos &amp; Café</span>
                <span className="sm:hidden">Desayunos</span>
              </TabsTrigger>
            </TabsList>

            {/* Pasteles Tab */}
            <TabsContent value="pasteles">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PASTELES.map((item, i) => (
                  <MenuCard key={item.name} item={item} delay={i * 0.08} />
                ))}
              </div>
            </TabsContent>

            {/* Platos Tab */}
            <TabsContent value="platos">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PLATOS.map((item, i) => (
                  <MenuCard key={item.name} item={item} delay={i * 0.08} />
                ))}
              </div>
            </TabsContent>

            {/* Desayunos Tab */}
            <TabsContent value="desayunos">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DESAYUNOS.map((item, i) => (
                  <MenuCard key={item.name} item={item} delay={i * 0.08} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

function MenuCard({
  item,
  delay,
}: {
  item: { name: string; description: string; price: string; image: string };
  delay: number;
}) {
  return (
    <FadeInWhenVisible delay={delay}>
      <Card className="overflow-hidden border-stone-100 hover:shadow-lg transition-all duration-300 group py-0 gap-0">
        {/* Real dish image */}
        <div className="h-48 relative overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-[#8B2252] shadow-sm">
            {item.price}
          </div>
        </div>
        <CardContent className="p-5 gap-2">
          <h3 className="font-serif font-bold text-stone-900 text-lg">
            {item.name}
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed">
            {item.description}
          </p>
        </CardContent>
      </Card>
    </FadeInWhenVisible>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

function GallerySection() {
  return (
    <section id="galeria" className="py-20 sm:py-28 bg-[#FFF8F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-12">
          <p className="text-[#D4A574] font-semibold text-sm tracking-widest uppercase mb-3">
            Nuestras Imágenes
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            Nuestra Galería
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Un vistazo a nuestro restaurante, nuestros platos y la experiencia
            que te espera.
          </p>
        </FadeInWhenVisible>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <FadeInWhenVisible key={img.src} delay={i * 0.1}>
              <div className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={i % 2 === 0 ? 400 : 500}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-medium text-sm">{img.alt}</p>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contacto" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible className="text-center mb-12">
          <p className="text-[#D4A574] font-semibold text-sm tracking-widest uppercase mb-3">
            Estamos Aquí
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            Contáctanos
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto">
            Visítanos en Sosúa o contáctanos para hacer tu reservación.
          </p>
        </FadeInWhenVisible>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <FadeInWhenVisible>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-stone-100 h-[350px] sm:h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.1!2d-70.5126!3d19.7594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb1e3cb17cdab45%3A0x5d143d97632850e9!2sDolci%20e%20Sapori%20Cake%20%26%20Kitchen!5e0!3m2!1ses!2sdo!4v1710000000000!5m2!1ses!2sdo"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Dolci e Sapori"
              />
            </div>
          </FadeInWhenVisible>

          {/* Contact Info */}
          <FadeInWhenVisible delay={0.2}>
            <div className="flex flex-col gap-6 h-full justify-center">
              {/* Address */}
              <Card className="border-stone-100 hover:border-[#D4A574]/20 hover:shadow-md transition-all py-5 gap-0">
                <CardContent className="flex items-start gap-4 px-6 py-0">
                  <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-[#D4A574]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">
                      Dirección
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Pedro Clisante 33, Sosúa 57000,
                      <br />
                      República Dominicana
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="border-stone-100 hover:border-[#D4A574]/20 hover:shadow-md transition-all py-5 gap-0">
                <CardContent className="flex items-start gap-4 px-6 py-0">
                  <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-[#D4A574]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">
                      Teléfono
                    </h3>
                    <a
                      href="tel:+18095714929"
                      className="text-[#8B2252] hover:underline font-medium text-sm"
                    >
                      +1 809-571-4929
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Hours */}
              <Card className="border-stone-100 hover:border-[#D4A574]/20 hover:shadow-md transition-all py-5 gap-0">
                <CardContent className="flex items-start gap-4 px-6 py-0">
                  <div className="w-12 h-12 rounded-full bg-[#D4A574]/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-[#D4A574]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">
                      Horario
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Lunes a Domingo
                      <br />
                      8:00 AM - 11:00 PM
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 bg-green-50 text-green-700 border border-green-200 text-xs"
                    >
                      Abierto ahora
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp CTA */}
              <Button
                asChild
                size="lg"
                className="w-full rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] h-14 text-base font-semibold gap-2 shadow-lg shadow-green-200"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo-restaurant.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-serif font-bold text-lg">Dolci e Sapori</p>
                <p className="text-white/50 text-xs">Cake & Kitchen</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Sabores italianos con alma caribeña en el corazón de Sosúa.
              Tradición, pasión y los mejores ingredientes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-[#D4A574]">
              Navegación
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-[#D4A574]">
              Menú
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#menu"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Pasteles & Postres
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Platos Principales
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="text-white/50 hover:text-white transition-colors text-sm"
                >
                  Desayunos & Café
                </a>
              </li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm tracking-wider uppercase text-[#D4A574]">
              Síguenos
            </h4>
            <div className="flex gap-3 mb-6">
              {["Facebook", "Instagram", "TikTok"].map((social) => (
                <div
                  key={social}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4A574] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold">
                    {social[0]}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-sm">
              <Phone className="h-3.5 w-3.5 inline mr-1.5" />
              +1 809-571-4929
            </p>
          </div>
        </div>

        <Separator className="bg-white/10 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-sm">
          <p>
            © 2026 Dolci e Sapori Cake &amp; Kitchen. Todos los derechos
            reservados.
          </p>
          <p>
            Sosúa, República Dominicana 🇩🇴
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp Floating Button ─────────────────────────────────────────────────

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-300/50 hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 animate-pulse-green"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
