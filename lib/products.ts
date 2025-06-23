import type React from "react"
import {
  ShieldCheck,
  Zap,
  Cpu,
  ListChecks,
  Target,
  Activity,
  MousePointerClick,
  Radar,
  Video,
  Palette,
  Fingerprint,
  Sparkles,
  Monitor,
  Gamepad2,
  Layers,
  Wrench,
  ShieldAlert,
  EyeIcon,
  ZapIcon,
  Settings2,
  Wind,
  Server,
  Gamepad,
  Bot,
  RefreshCw,
  Settings,
} from "lucide-react"

export interface ProductFeature {
  // Summarized feature for main display
  name: string
  description: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface RequirementItem {
  id: string
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DetailedFeatureItem {
  name: string
  details?: string[] // For sub-features if any, not used in this pass for simplicity
}

export interface DetailedFeaturesByCategory {
  categoryName: string
  items: DetailedFeatureItem[]
}

export interface PurchaseOption {
  id: string
  name: string
  price: number
  displayPrice: string
  durationLabel?: string
  isPopular?: boolean
  shopifyVariantId?: string
  saInfo?: {
    shopId: number
    productId: number
    variantId: number
  }
}

export type ProductStatus = "online" | "updating" | "maintenance" | "offline" | "degraded"
export type ProductCategory = "fortnite" | "rust" | "rainbow-six" | "spoofer" | "call-of-duty" | "all"

export const categoryMap: Record<ProductCategory, string> = {
  fortnite: "Fortnite",
  rust: "Rust",
  "rainbow-six": "Rainbow Six Siege",
  spoofer: "HWID Spoofers",
  "call-of-duty": "Call of Duty",
  all: "All Products",
}

export interface Product {
  id: string
  name: string
  displayName: string
  slug: string
  category: Exclude<ProductCategory, "all">
  image: string
  thumbnailImage?: string
  carouselImage?: string
  description: string
  longDescription: string
  stockStatus: ProductStatus
  rating?: number
  reviewsCount?: number
  features: ProductFeature[] // Summarized
  detailedFeatureList?: DetailedFeaturesByCategory[] // For "View All Features" modal
  requirements: Array<RequirementItem | string>
  galleryImages?: string[]
  videos?: string[]
  purchaseOptions: PurchaseOption[]
  tag?: string
  comparisonFeatures?: Record<string, Record<string, boolean | string>>
}

const placeholderVideo = "https://www.youtube.com/embed/dQw4w9WgXcQ"
const SELLAUTH_SHOP_ID = Number.parseInt(process.env.NEXT_PUBLIC_SA_SHOP_ID || "152821")

export const products: Product[] = [
  // Fortnite Products
  {
    id: "fn-supreme",
    name: "[FN] CDN Supreme Software",
    displayName: "CDN Fortnite Supreme",
    slug: "fn-supreme",
    category: "fortnite",
    image: "/images/products/fn-supreme.png", // Updated
    thumbnailImage: "/images/products/fn-supreme.png",
    carouselImage: "/images/carousel/fortnite-hero-v2.png",
    description: "The ultimate enhancement package for FN with all premium features unlocked.",
    longDescription:
      "Experience Fortnite like never before with the CDN Supreme Software. This all-inclusive package provides cutting-edge aim assistance, comprehensive environmental perception (ESP), and a suite of utility features designed for top-tier performance and security. Regular updates ensure you're always equipped with the latest advantages.",
    stockStatus: "online",
    features: [
      {
        name: "Advanced Aimbot",
        description: "Memory/Silent aim, prediction, triggerbot, and full customization.",
        icon: Target,
      },
      {
        name: "Comprehensive Visuals",
        description: "Player ESP, skeleton, item ESP, radar, and extensive customization.",
        icon: EyeIcon,
      },
      {
        name: "Configurability & Control",
        description: "Save/Load CFG, FPS Locker, and streamproof options.",
        icon: Settings2,
      },
      {
        name: "Platform Support",
        description: "Full support for Windows 10/11, Intel/AMD, and controllers.",
        icon: Monitor,
      },
    ],
    detailedFeatureList: [
      {
        categoryName: "Aimbot",
        items: [
          { name: "Aim Bot [Enable/Disable]" },
          { name: "Aim Type: [Memory/Silent]" },
          { name: "Keybind Aim" },
          { name: "Aim Bone [Head/Neck/Body/Pelvis]" },
          { name: "Lock Target: [Enable/Disable]" },
          { name: "Keybind Lock Target" },
          { name: "Draw Fov [Enable/Disable]" },
          { name: "FOV Circle Colour" },
          { name: "FOV Circle Size" },
          { name: "Adjustable Speed Aim" },
          { name: "Prediction [Enable/Disable]" },
          { name: "Visible Check [Enable/Disable]" },
          { name: "Aimbot For Bots [Enable/Disable]" },
          { name: "Trigger Bot" },
          { name: "Trigger Bot With Keybind" },
          { name: "Keybind Trigger" },
          { name: "Trigger Bot ShotGun Only" },
        ],
      },
      {
        categoryName: "Visuals",
        items: [
          { name: "Drawing Distance [Determines min/max to render visuals]" },
          { name: "Draw BOT's [Enable/Disable]" },
          { name: "Skeleton [Enable/Disable]" },
          { name: "Skeleton Colour" },
          { name: "Skeleton Colour Visible" },
          { name: "Head [Enable/Disable]" },
          { name: "Head Colour" },
          { name: "Head Colour Visible" },
          { name: "Box [Enable/Disable]" },
          { name: "Box Colour" },
          { name: "Box Colour Visible" },
          { name: "Distance [Enable/Disable]" },
          { name: "Distance Colour" },
          { name: "Snap Lines [Enable/Disable]" },
          { name: "Snap Lines Angle [Top/Middle/Bottom]" },
          { name: "Snap Lines Colour" },
          { name: "Snap Lines Colour Visible" },
          { name: "Name [Enable/Disable]" },
          { name: "Name Colour" },
          { name: "Plataform [Enable/Disable]" },
          { name: "Plataform Colour" },
          { name: "Eye Direction [Enable/Disable]" },
          { name: "Eye Colour" },
          { name: "Team [Enable/Disable]" },
          { name: "TeamColour" },
          { name: "Radar [Enable/Disable]" },
        ],
      },
      {
        categoryName: "Configs",
        items: [
          { name: "Cfg [Save/Load]" },
          { name: "Streamproof [Enable/Disable]" },
          { name: "FPS Locker [Enable/Disable]" },
        ],
      },
    ],
    requirements: [
      {
        id: "os-fn-sup",
        label: "Operating System",
        value: "Windows 10/11 (Including Custom Builds like Tinity 21h2, Kernel OS 22h2)",
        icon: Monitor,
      },
      { id: "cpu-fn-sup", label: "Processor", value: "Intel, AMD & Xeon Supported", icon: Cpu },
      { id: "controller-fn-sup", label: "Controller", value: "Supported", icon: Gamepad2 },
    ],
    galleryImages: [
      "/images/products/gallery/fn-supreme/fn-supreme-gallery-menu-ingame.png",
      "/images/products/gallery/fn-supreme/fn-supreme-gallery-menu-lobby.png",
    ],
    videos: [placeholderVideo],
    purchaseOptions: [
      {
        id: "fn-sup-1d",
        name: "1 Day",
        price: 8.99,
        displayPrice: "$8.99",
        shopifyVariantId: "51859968459085",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370126, variantId: 521994 },
      },
      {
        id: "fn-sup-1w",
        name: "1 Week",
        price: 27.99,
        displayPrice: "$27.99",
        isPopular: true,
        shopifyVariantId: "51859968491853",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370126, variantId: 521995 },
      },
      {
        id: "fn-sup-1m",
        name: "1 Month",
        price: 44.99,
        displayPrice: "$44.99",
        shopifyVariantId: "51859968524621",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370126, variantId: 521996 },
      },
    ],
    tag: "FORTNITE",
  },
  {
    id: "fn-private",
    name: "[FN] CDN Private Software",
    displayName: "CDN Fortnite Private",
    slug: "fn-private",
    category: "fortnite",
    image: "/images/products/fn-private.png", // Updated
    thumbnailImage: "/images/products/fn-private.png",
    carouselImage: "/images/carousel/fortnite-hero-v2.png",
    description: "Our premium enhancement suite designed for discerning players.",
    longDescription:
      "The CDN Private Software for Fortnite offers a curated selection of powerful features, focusing on reliability and performance. Enhance your gameplay with advanced aim assistance and clear visual information, all wrapped in a secure package.",
    stockStatus: "online",
    features: [
      {
        name: "Highly Configurable Aimbot",
        description: "Weapon-specific configs, prediction, triggerbot, and multiple hitbox options.",
        icon: Target,
      },
      {
        name: "Extensive Visuals Suite",
        description: "Box, Skeleton, Held Weapon, Item ESP, Tactical Radar, and rich color customization.",
        icon: EyeIcon,
      },
      {
        name: "Tournament Ready",
        description: "Full controller support, VSync toggle, and battlemode for competitive play.",
        icon: ShieldCheck,
      },
      {
        name: "Customizable ESP",
        description: "Multiple ESP fonts, font sizes, and outline styles for optimal clarity.",
        icon: Palette,
      },
    ],
    detailedFeatureList: [
      {
        categoryName: "Visuals",
        items: [
          { name: "Box (Corner Box, Full Box)" },
          { name: "Skeleton (Bezier, Sharp)" },
          { name: "Team ID" },
          { name: "Seperate TeamID Color" },
          { name: "Distance" },
          { name: "Held Weapon" },
          { name: "Show Team" },
          { name: "Show NPC" },
          { name: "Filled Box" },
          { name: "Show Kills" },
          { name: "Show Platform" },
          { name: "Snaplines (Center, Top, Bottom)" },
          { name: "Target Line" },
          { name: "Visible Color" },
          { name: "Hidden Color" },
          { name: "Knocked Color" },
          { name: "Team Color" },
          { name: "NPC Color" },
          { name: "Target Color" },
          { name: "Text Color" },
          { name: "Skeleton Color" },
          { name: "Hidden Skeleton Color" },
          { name: "Radar Enabled" },
          { name: "Radar Team Visualizer" },
          { name: "Radar Distance Visualizer" },
          { name: "Radar Background Alpha" },
          { name: "Radar Player Size" },
          { name: "Radar Render Radius" },
          { name: "Radar Render Distance" },
          { name: "Radar Background Color" },
          { name: "Radar Enemy Color" },
          { name: "Radar Team Color" },
          { name: "Radar Automatic Distance Scaling" },
          { name: "Radar Orientation Lock" },
        ],
      },
      {
        categoryName: "Aimbot",
        items: [
          { name: "Weapon Configs for each type of weapon" },
          { name: "Aimbot Enabled" },
          { name: "Aimbot Prediction" },
          { name: "Aimbot Hitbox (Head, Neck, Chest, Pelvis)" },
          { name: "Aimbot Smoothing" },
          { name: "Aimbot Deadzone" },
          { name: "Weapon Aim FOV" },
          { name: "Aimbot Max Distance" },
          { name: "Triggerbot Enabled" },
          { name: "Triggerbot Hitbox (Head, Neck, Chest, Pelvis)" },
          { name: "Triggerbot Delay" },
          { name: "Draw FOV" },
          { name: "Filled FOV" },
          { name: "Visible Check" },
          { name: "Ignore Wounded" },
          { name: "Ignore Team" },
          { name: "Aimbot Keybind" },
          { name: "Aimbot Keybind #2" },
          { name: "Triggerbot Keybind" },
        ],
      },
      {
        categoryName: "Item ESP",
        items: [
          { name: "Enabled" },
          { name: "Item Config (Materials, Uncommon, Rare, Epic, Legendary, Exotic)" },
          { name: "Show Item" },
          { name: "Item Color" },
          { name: "Show Rarity" },
          { name: "Show Distance" },
          { name: "Item Max Distance" },
        ],
      },
      {
        categoryName: "Misc",
        items: [
          { name: "Battlemode Toggle" },
          { name: "Configs" },
          { name: "VSync Toggle" },
          { name: "ESP Font (Tahoma, Pixel, Fortnite, Matcha)" },
          { name: "ESP Font Size" },
          { name: "ESP Outline (Drop Shadow, Full Outline, Half Outline)" },
          { name: "Full Controller Support" },
          { name: "Tournament support" },
        ],
      },
    ],
    requirements: [
      { id: "os-fn-priv", label: "Operating System", value: "Windows 10 / 11 (All Versions)", icon: Monitor },
      { id: "cpu-fn-priv", label: "Processor", value: "Intel / AMD", icon: Cpu },
    ],
    galleryImages: [
      "/images/products/gallery/fn-private/fn-private-gallery-gameplay-esp.png",
      "/images/products/gallery/fn-private/fn-private-gallery-tournament-leaderboard.png",
      "/images/products/gallery/fn-private/fn-private-gallery-lobby-rank.png",
    ],
    videos: [placeholderVideo],
    purchaseOptions: [
      {
        id: "fn-priv-1d",
        name: "1 Day",
        price: 9.99,
        displayPrice: "$9.99",
        shopifyVariantId: "51859968131405",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 521990 },
      },
      {
        id: "fn-priv-3d",
        name: "3 Days",
        price: 17.99,
        displayPrice: "$17.99",
        shopifyVariantId: "placeholder-fn-priv-3d",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 522032 },
      },
      {
        id: "fn-priv-1w",
        name: "1 Week",
        price: 33.99,
        displayPrice: "$33.99",
        isPopular: true,
        shopifyVariantId: "51859968164173",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 521991 },
      },
      {
        id: "fn-priv-1m",
        name: "1 Month",
        price: 64.99,
        displayPrice: "$64.99",
        shopifyVariantId: "51859968196941",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 521992 },
      },
      {
        id: "fn-priv-lt",
        name: "Lifetime",
        price: 299.99,
        displayPrice: "$299.99",
        shopifyVariantId: "placeholder-fn-priv-lt",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 521993 },
      },
    ],
    tag: "FORTNITE",
  },
  // Rust Products
  {
    id: "rust-supreme",
    name: "[RUST] CDN Supreme Cheat",
    displayName: "CDN Rust Supreme Cheat",
    slug: "rust-supreme",
    category: "rust",
    image: "/images/products/rust-supreme.png", // Updated
    thumbnailImage: "/images/products/rust-supreme.png",
    carouselImage: "/images/carousel/rust-hero-v2.png",
    description: "The ultimate Rust script with advanced features and full customization.",
    longDescription:
      "Dominate the harsh world of Rust with the CDN Supreme Script. Featuring unparalleled recoil control for all weapons, advanced automation for farming and crafting, and comprehensive ESP to keep you aware of your surroundings. This script is your key to survival and supremacy.",
    stockStatus: "online",
    features: [
      {
        name: "Powerful Aimbot",
        description: "Silent aim, target saving, and aimbone selection for precision.",
        icon: Target,
      },
      {
        name: "Full Spectrum Visuals",
        description: "Player, Scientist, Ore, Resource, Loot, and World ESP with Chams.",
        icon: EyeIcon,
      },
      { name: "Advanced Radar System", description: "Highly customizable radar for tactical awareness.", icon: Radar },
      {
        name: "Game-Changing Misc Features",
        description: "No Recoil/Sway/Spread, Flyhack, FOV Changer, Fast Loot, and more.",
        icon: ZapIcon,
      },
    ],
    detailedFeatureList: [
      {
        categoryName: "AIMBOT",
        items: [
          { name: "Enable/Disable" },
          { name: "Silent Aimbot" },
          { name: "Save Target" },
          { name: "Aimbone Selection" },
          { name: "Draw Crosshair" },
        ],
      },
      {
        categoryName: "VISUALS",
        items: [
          { name: "Draw Players" },
          { name: "Draw Scientists" },
          { name: "Skeleton" },
          { name: "Distance" },
          { name: "Name" },
          { name: "Chams" },
          { name: "Held Item" },
          { name: "Player Hotbar" },
          { name: "OOF Indicators" },
          { name: "Draw Ores" },
          { name: "Draw Resources" },
          { name: "Draw Lootables" },
          { name: "World ESP" },
          { name: "Deployables" },
          { name: "Skeleton Thickness" },
          { name: "Color Selection" },
        ],
      },
      {
        categoryName: "RADAR",
        items: [
          { name: "Enable Radar" },
          { name: "Draw Scientist" },
          { name: "Draw Cross" },
          { name: "Draw Background" },
          { name: "Draw Text" },
          { name: "Draw Circles" },
          { name: "Draw Direction" },
          { name: "X/Y Positioning" },
          { name: "Radar Window Sizing" },
          { name: "Customize Transparency" },
        ],
      },
      {
        categoryName: "MISC",
        items: [
          { name: "No Recoil/Sway/Spread" },
          { name: "FOV Changer" },
          { name: "Fast Loot" },
          { name: "Flyhack" },
          { name: "No Water Gravity" },
          { name: "Spiderman" },
          { name: "Infinite Jump" },
          { name: "Always Sprint" },
          { name: "Projectile Speed" },
          { name: "Full Auto" },
          { name: "Eoka Modifications" },
          { name: "Dayhack" },
          { name: "Sky Changer" },
          { name: "Bright Stars" },
          { name: "Zoom" },
          { name: "Unlock Angles" },
          { name: "Config System" },
        ],
      },
    ],
    requirements: [
      { id: "os-rust-sup", label: "Operating System", value: "Windows 10-11 [2004-24h2]", icon: Monitor },
      { id: "cpu-rust-sup", label: "Processor", value: "Intel & AMD", icon: Cpu },
      { id: "anticheat-rust-sup", label: "Anticheat", value: "EAC", icon: ShieldAlert },
      { id: "windowmode-rust-sup", label: "Window Mode", value: "Windowed/Borderless", icon: Layers },
      { id: "launcher-rust-sup", label: "Launcher", value: "Steam", icon: Server },
      { id: "streamproof-rust-sup", label: "Stream-Proof", value: "Yes", icon: Video },
      { id: "spooferinc-rust-sup", label: "Spoofer Included", value: "No", icon: Fingerprint },
    ],
    galleryImages: [
      "/images/products/gallery/rust-supreme/rust-supreme-gallery-gameplay.png",
      "/images/products/gallery/rust-supreme/rust-supreme-gallery-menu-aimbot.png",
      "/images/products/gallery/rust-supreme/rust-supreme-gallery-menu-visuals-players.png",
      "/images/products/gallery/rust-supreme/rust-supreme-gallery-menu-visuals-resources.png",
      "/images/products/gallery/rust-supreme/rust-supreme-gallery-menu-visuals-ore.png",
      "/images/products/gallery/rust-supreme/rust-supreme-gallery-menu-visuals-world.png",
      "/images/products/gallery/rust-supreme/rust-supreme-gallery-menu-visuals-lootables.png",
      "/images/products/gallery/rust-supreme/rust-supreme-gallery-menu-visuals-deployables.png",
    ],
    videos: [placeholderVideo],
    purchaseOptions: [
      {
        id: "rust-sup-1d",
        name: "1 Day",
        price: 8.99,
        displayPrice: "$8.99",
        shopifyVariantId: "51859967770957",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370124, variantId: 370126 },
      },
      {
        id: "rust-sup-1w",
        name: "1 Week",
        price: 34.99,
        displayPrice: "$34.99",
        isPopular: true,
        shopifyVariantId: "51859967803725",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370124, variantId: 521995 },
      },
      {
        id: "rust-sup-1m",
        name: "1 Month",
        price: 64.99,
        displayPrice: "$64.99",
        shopifyVariantId: "51860506476877",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370124, variantId: 521996 },
      },
    ],
    tag: "RUST",
  },
  {
    id: "rust-ultimate",
    name: "[RUST] CDN Ultimate Cheat",
    displayName: "CDN Rust Ultimate Cheat",
    slug: "rust-ultimate",
    category: "rust",
    image: "/images/products/rust-ultimate.png", // Updated
    thumbnailImage: "/images/products/rust-ultimate.png",
    carouselImage: "/images/carousel/rust-hero-v2.png",
    description: "The most comprehensive Rust script for advanced players seeking total domination.",
    longDescription:
      "Elevate your Rust experience to unprecedented levels with the CDN Ultimate Script. This all-encompassing package includes top-tier, undetectable recoil compensation for all weapons, intelligent ESP providing detailed information on players, resources, and deployables, a full suite of automation features for farming, crafting, and base management, plus silent farm/melee capabilities. Robust security measures and regular updates ensure you stay ahead of the competition. Dedicated support included.",
    stockStatus: "online",
    features: [
      {
        name: "Precision Silent Aimbot",
        description: "Advanced aimbot with smoothing, auto-shoot, and hitchance control.",
        icon: Target,
      },
      {
        name: "Weapon Mastery",
        description: "Zero recoil/spread, instant Eoka/Bow, thick bullets, and customizable weapon stats.",
        icon: Wrench,
      },
      {
        name: "Total Visual Awareness",
        description: "Extensive Player ESP, Chams, Hotbar ESP, and detailed World ESP for all entities.",
        icon: EyeIcon,
      },
      {
        name: "Enhanced Movement & Misc",
        description: "Flyhack, Spiderman, Admin Flags, FOV/Time Changer, Fast Loot, and much more.",
        icon: Wind,
      },
    ],
    detailedFeatureList: [
      {
        categoryName: "Aimbot",
        items: [
          { name: "Silent Aim (Head, Chest, Stomach, Pelvis)" },
          { name: "Aimbot Smoothing" },
          { name: "Auto Shoot" },
          { name: "Wait For Powershot" },
          { name: "Target Team" },
          { name: "Visible Check" },
          { name: "Hitchance %" },
          { name: "Draw FOV" },
          { name: "Target Line" },
          { name: "Fire Speed" },
          { name: "Fast Bullet" },
        ],
      },
      {
        categoryName: "Weapon",
        items: [
          { name: "Always Automatic" },
          { name: "Insant Eoka" },
          { name: "Instant Bow" },
          { name: "Shotgun Nospread" },
          { name: "Thick Bullet (0m - 1m)" },
          { name: "Bow Thick Bullet Override" },
          { name: "Recoil X Slider" },
          { name: "Recoil Y Slider" },
          { name: "Spread Slider" },
          { name: "Fire Speed Slider" },
        ],
      },
      {
        categoryName: "Visuals",
        items: [
          { name: "Player ESP" },
          { name: "Show Team" },
          { name: "Show Wounded" },
          { name: "Show Sleeper" },
          { name: "Show Dead" },
          { name: "Name ESP" },
          { name: "Box (Full, Corner)" },
          { name: "Healthbar (Side, Bottom, Top)" },
          { name: "Distance (Side, Top, Bottom, Name)" },
          { name: "Skeleton" },
          { name: "Bounding Box" },
          { name: "Chams (18 options)" },
          { name: "Hotbar" },
          { name: "Icon Hotbar (Show Name, Show Amount, Hotbar Size)" },
          { name: "Hand Chams (18 options)" },
          { name: "Weapon Chams (18 options)" },
        ],
      },
      {
        categoryName: "Movement",
        items: [
          { name: "No Fall Damage" },
          { name: "Infinite Jump" },
          { name: "Spiderman" },
          { name: "Flyhack (Toggle, Hold)" },
          { name: "Desync/Fakelag (Toggle, Always, Amount)" },
          { name: "Suicide" },
          { name: "Small Capsule" },
          { name: "Interactive Debug Camera (Camera Speed, Camera Speed Fast)" },
          { name: "Omni Sprint" },
          { name: "Shoot While Jumping" },
        ],
      },
      {
        categoryName: "Other",
        items: [
          { name: "Admin Flags" },
          { name: "Zoom" },
          { name: "FOV Changer" },
          { name: "Time Changer" },
          { name: "Bright Night" },
          { name: "Long Neck" },
          { name: "Remove Layer" },
          { name: "Custom Stars (Brightness, Size)" },
          { name: "Custom Clouds" },
          { name: "Custom Sky" },
          { name: "Battle Mode" },
          { name: "Hitbox Override (Off, Head, Chest, Foot)" },
          { name: "Fast Loot" },
          { name: "Instant Revive" },
          { name: "Equip While Mounted" },
          { name: "Hitsound" },
          { name: "Ignore Tree Collision" },
          { name: "Ignore Player Collision" },
        ],
      },
      {
        categoryName: "World ESP",
        items: [
          { name: "Ore Name/Distance (Sulfur, Metal, Stone)" },
          { name: "Collectable Name/Distance (Hemp)" },
          { name: "Vehicle Name/Distance (Minicopter, Scrap Heli, Tugboat)" },
          {
            name: "Deployable Name/Distance (Stash, Tool Cupboard, Workbench, Corpse, Dropped Weapon, Hackable Crate, Traps)",
          },
          { name: "Tool Cupboard ESP (Show Upkeep, Show Auth, Distance)" },
          { name: "Workbench ESP (T1, T2, T3, Distance)" },
          { name: "Trap Max Distance" },
        ],
      },
      {
        categoryName: "Settings",
        items: [
          { name: "Menu Accent Color" },
          { name: "Watermark" },
          { name: "ESP Font (Pixel, Roboto, Minecraft)" },
          { name: "ESP Outline (None, Half, Four, Eight)" },
          { name: "Crosshair (Dot, Plus, Cross, CSGO)" },
          { name: "Disable crosshair while aiming" },
          { name: "Show Bow Crosshair Always" },
          { name: "Seperate Distance Placement" },
          { name: "Seperate Distance Color" },
          { name: "Configs" },
        ],
      },
    ],
    requirements: [
      { id: "os-rust-ult", label: "Operating System", value: "Windows 10 / 11 (All Versions)", icon: Monitor },
      { id: "cpu-rust-ult", label: "Processor", value: "Intel / AMD", icon: Cpu },
    ],
    purchaseOptions: [
      {
        id: "rust-ult-1d",
        name: "1 Day",
        price: 7.99,
        displayPrice: "$7.99",
        shopifyVariantId: "51859967476045",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 521982 },
      },
      {
        id: "rust-ult-3d",
        name: "3 Days",
        price: 15.99,
        displayPrice: "$15.99",
        shopifyVariantId: "placeholder-rust-ult-3d",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 522026 },
      },
      {
        id: "rust-ult-1w",
        name: "1 Week",
        price: 29.99,
        displayPrice: "$29.99",
        isPopular: true,
        shopifyVariantId: "51859967508813",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 521983 },
      },
      {
        id: "rust-ult-1m",
        name: "1 Month",
        price: 59.99,
        displayPrice: "$59.99",
        shopifyVariantId: "51859967541581",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 521984 },
      },
      {
        id: "rust-ult-lt",
        name: "Lifetime",
        price: 299.99,
        displayPrice: "$299.99",
        shopifyVariantId: "placeholder-rust-ult-lt",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 521985 },
      },
    ],
    tag: "RUST",
    galleryImages: [
      "/images/products/gallery/rust-ultimate/rust-ultimate-gallery-rooftop-esp.png",
      "/images/products/gallery/rust-ultimate/rust-ultimate-gallery-debug-camera-esp.png",
      "/images/products/gallery/rust-ultimate/rust-ultimate-gallery-snow-ads-esp.png",
    ],
    videos: [placeholderVideo],
  },
  // Rainbow Six Siege Products
  {
    id: "r6-ultimate",
    name: "[R6] Ultimate Software",
    displayName: "R6 Ultimate Software",
    slug: "r6-ultimate",
    category: "rainbow-six",
    image: "/images/products/r6-ultimate.png", // Updated
    thumbnailImage: "/images/products/r6-ultimate.png",
    carouselImage: "/images/carousel/r6-siege-x-hero-v2.png",
    stockStatus: "online",
    features: [
      {
        name: "Precision Aimbot",
        description: "Active aimbot with keybinds, FOV, hitbox selection, and sensitivity controls.",
        icon: Target,
      },
      {
        name: "Comprehensive Player ESP",
        description: "Box, Line, Distance, Skeleton, Name, Head, Health, and Team Check.",
        icon: EyeIcon,
      },
      {
        name: "Gadget ESP & Misc",
        description: "Detect gadgets and benefit from hit damage effects for tactical advantage.",
        icon: ZapIcon,
      },
    ],
    detailedFeatureList: [
      {
        categoryName: "Aimbot",
        items: [
          { name: "Active Aimbot" },
          { name: "Aimbot Keys" },
          { name: "FOV Size" },
          { name: "Hitboxes" },
          { name: "Sensitivity" },
          { name: "Mark Target" },
          { name: "Crosshair" },
        ],
      },
      {
        categoryName: "Visuals",
        items: [
          { name: "Player ESP" },
          { name: "ESP Box" },
          { name: "ESP Line" },
          { name: "Player Distance" },
          { name: "Skeleton" },
          { name: "Name - players' nicknames" },
          { name: "Head - select head hitbox separately using ESP" },
          { name: "Health (Bar, Text)" },
          { name: "Team Check" },
          { name: "Max Distance" },
        ],
      },
      { categoryName: "Misc", items: [{ name: "Gadget ESP" }, { name: "Hit Damage Effect" }] },
    ],
    requirements: [
      { id: "cpu-r6-ult", label: "Processor", value: "Intel / AMD", icon: Cpu },
      { id: "os-r6-ult", label: "Operating System", value: "Windows 10 / 11", icon: Monitor },
    ],
    galleryImages: [
      "/images/products/gallery/r6-ultimate/r6-ultimate-gallery-gameplay-esp.png",
      "/images/products/gallery/r6-ultimate/r6-ultimate-gallery-scoreboard.png",
    ],
    videos: [placeholderVideo],
    purchaseOptions: [
      {
        id: "r6-ult-1d",
        name: "1 Day",
        price: 6.79,
        displayPrice: "$6.79",
        shopifyVariantId: "51860027834701",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370127, variantId: 521998 },
      },
      {
        id: "r6-ult-1w",
        name: "1 Week",
        price: 27.99,
        displayPrice: "$27.99",
        shopifyVariantId: "51860506280269",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370127, variantId: 521999 },
      },
      {
        id: "r6-ult-1m",
        name: "1 Month",
        price: 59.99,
        displayPrice: "$59.99",
        shopifyVariantId: "51860506313037",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370127, variantId: 522000 },
      },
    ],
    tag: "R6",
    description: "The definitive enhancement suite for Rainbow Six Siege.",
    longDescription:
      "Gain tactical superiority in Rainbow Six Siege with the R6 Ultimate Software. This comprehensive suite includes precise aim assistance, full operator and gadget ESP, and other crucial utilities to outmaneuver your opponents. Designed for security and performance, it's the ultimate tool for serious Siege players.",
  },
  // HWID Spoofer Products
  {
    id: "spoofer-perma",
    name: "Perm Spoofer",
    displayName: "Perm HWID Spoofer",
    slug: "spoofer-perma",
    category: "spoofer",
    image: "/images/products/spoofer-perma.png", // Updated
    thumbnailImage: "/images/products/spoofer-perma.png",
    carouselImage: "/images/carousel/spoofer-hero-v2.png",
    description: "Our most robust permanent HWID spoofer for long-term ban evasion.",
    longDescription:
      "The Perm HWID Spoofer V4 offers a permanent solution to hardware ID bans. With advanced spoofing techniques, it ensures your system identifiers are permanently altered, allowing you to bypass bans across numerous games. Features include comprehensive system cleaning, support for various motherboard brands, and a user-friendly interface with clear status indicators. Stay in the game without worrying about recurring bans.",
    stockStatus: "online",
    features: [
      {
        name: "Permanent HWID Spoofing",
        description: "One-time permanent change to your hardware identifiers.",
        icon: RefreshCw,
      },
      {
        name: "Comprehensive Cleaning",
        description: "Improved cache cleaning and removal of WMI dependencies.",
        icon: Sparkles,
      },
      {
        name: "Broad Compatibility",
        description: "Supports various motherboard manufacturers including ASUS and Gigabyte.",
        icon: Cpu,
      },
      {
        name: "User-Friendly Interface",
        description: "Clear login, announcements, device info, and spoofing options.",
        icon: Settings2,
      },
    ],
    detailedFeatureList: [
      {
        categoryName: "Core Features",
        items: [
          { name: "Permanent HWID Spoofing" },
          { name: "ASUS Specific Spoofing" },
          { name: "MAC Address Spoofing" },
          { name: "Improved Cache Cleaning" },
          { name: "Gigabyte Motherboard Spoofing Support" },
          { name: "Removal of most WMI dependencies" },
          { name: "Reworked Authentication Security" },
          { name: "Loader Performance & Stabilization Improvements" },
        ],
      },
      {
        categoryName: "Interface & Usability",
        items: [
          { name: "Secure Key-based Login" },
          { name: "Announcements Section for Updates" },
          { name: "Device Information Tab" },
          { name: "Spoofer Options Tab" },
          { name: "Serial Status Legend (Changed, Unchanged, Default)" },
          { name: "TPM (Trusted Platform Module) Status Display" },
        ],
      },
    ],
    requirements: [
      {
        id: "os-spoofer-perma",
        label: "Windows Versions",
        value: "Windows 10 & Windows 11 (Latest versions recommended)",
        icon: Monitor,
      },
      {
        id: "mobo-spoofer-perma",
        label: "Motherboard",
        value: "Supports most common manufacturers (ASUS, Gigabyte, MSI, etc.)",
        icon: Cpu,
      },
      {
        id: "bios-spoofer-perma",
        label: "BIOS Access",
        value: "May be required for initial setup on some systems",
        icon: Settings,
      },
    ],
    galleryImages: [
      "/images/products/gallery/spoofer-perma/spoofer-perma-gallery-login.png",
      "/images/products/gallery/spoofer-perma/spoofer-perma-gallery-announcements.png",
      "/images/products/gallery/spoofer-perma/spoofer-perma-gallery-serial-status.png",
      "/images/products/gallery/spoofer-perma/spoofer-perma-gallery-device-info.png",
      "/images/products/gallery/spoofer-perma/spoofer-perma-gallery-spoofer-options.png",
    ],
    videos: [], // No videos provided
    purchaseOptions: [
      {
        id: "spoofer-perma-onetime",
        name: "Onetime",
        price: 19.99, // Placeholder price
        displayPrice: "$19.99",
        isPopular: true,
        shopifyVariantId: "51899275641165",
        // saInfo will be added later
      },
      {
        id: "spoofer-perma-lifetime",
        name: "Lifetime",
        price: 69.99, // Placeholder price
        displayPrice: "$69.99",
        shopifyVariantId: "51899275673933",
        // saInfo will be added later
      },
    ],
    tag: "ALL",
  },
  {
    id: "spoofer-temp-v2",
    name: "Temp v2 HWID Spoofer",
    displayName: "Temp v2 HWID Spoofer",
    slug: "spoofer-temp-v2",
    category: "spoofer",
    image: "/images/products/spoofer-temp-v2.png", // Updated
    thumbnailImage: "/images/products/spoofer-temp-v2.png",
    carouselImage: "/images/carousel/spoofer-hero-v2.png",
    stockStatus: "online",
    features: [
      {
        name: "One-Click Spoofing",
        description: "Effortlessly change your HWID with a single click.",
        icon: MousePointerClick,
      },
      { name: "Advanced Seeding System", description: "Ensures effective and varied spoofing.", icon: ZapIcon },
      {
        name: "Integrated Cleaner",
        description: "Includes an inbuilt cleaner, with a tournament-ready option.",
        icon: Sparkles,
      },
      {
        name: "Easy Setup",
        description: "User-friendly interface for quick and simple configuration.",
        icon: Settings2,
      },
    ],
    detailedFeatureList: [
      {
        categoryName: "Core Features",
        items: [
          { name: "One click go" },
          { name: "Seeding system" },
          { name: "Inbuilt cleaner" },
          { name: "Tournament ready cleaner" },
          { name: "Easy setup" },
        ],
      },
    ],
    requirements: [
      {
        id: "os-spoofer-v2",
        label: "Windows Versions",
        value: "Windows 10 (2004-22H2) & Windows 11 (21H2-24H2), x64",
        icon: Monitor,
      },
    ],
    purchaseOptions: [
      {
        id: "spoofer-v2-15d",
        name: "15 Days",
        price: 27.99,
        displayPrice: "$27.99",
        isPopular: true,
        shopifyVariantId: "51860034453837",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370128, variantId: 522002 },
      },
      {
        id: "spoofer-v2-30d",
        name: "30 Days",
        price: 46.99,
        displayPrice: "$46.99",
        shopifyVariantId: "51860505035085",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370128, variantId: 522003 },
      },
      {
        id: "spoofer-v2-90d",
        name: "90 Days",
        price: 118.99,
        displayPrice: "$118.99",
        shopifyVariantId: "51860505067853",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370128, variantId: 522004 },
      },
    ],
    tag: "ALL",
    description: "Our latest temporary spoofer with enhanced compatibility.",
    longDescription:
      "The Temp v2 HWID Spoofer is designed to bypass hardware bans effectively across a wide range of games. With improved compatibility and ease of use, get back into your favorite games quickly and securely. This version offers temporary spoofing for flexibility.",
    galleryImages: [
      "/images/products/gallery/spoofer-temp-v2/spoofer-v2-gallery-authorize.png",
      "/images/products/gallery/spoofer-temp-v2/spoofer-v2-gallery-success.png",
      "/images/products/gallery/spoofer-temp-v2/spoofer-v2-gallery-main-interface.png",
    ],
    videos: [],
  },
  {
    id: "spoofer-temp-pro",
    name: "Temp Pro HWID Spoofer",
    displayName: "Temp Pro HWID Spoofer",
    slug: "spoofer-temp-pro",
    category: "spoofer",
    image: "/images/products/spoofer-temp-pro.png", // Updated
    thumbnailImage: "/images/products/spoofer-temp-pro.png",
    carouselImage: "/images/carousel/spoofer-hero-v2.png",
    stockStatus: "updating",
    features: [
      {
        name: "Deep System Spoofing",
        description: "Masks a wider range of hardware identifiers effectively.",
        icon: Cpu,
      },
      { name: "One-Click Activation", description: "Simple, intuitive, and fast spoofing process.", icon: Zap },
      {
        name: "Broad Game Support",
        description: "Compatible with numerous popular titles and modern anti-cheats.",
        icon: ListChecks,
      },
      {
        name: "Status: Enhancements In Progress",
        description: "Currently being updated with new features and improvements.",
        icon: Activity,
      },
    ],
    // detailedFeatureList: [], // Can add if more details are available
    requirements: ["Windows 10/11", "Admin Privileges", "Virtualization Enabled in BIOS (recommended)"],
    purchaseOptions: [
      { id: "spoofer-pro-1d", name: "1 Day", price: 4.99, displayPrice: "$4.99", shopifyVariantId: "51860044513613" },
      {
        id: "spoofer-pro-1w",
        name: "1 Week",
        price: 19.99,
        displayPrice: "$19.99",
        isPopular: true,
        shopifyVariantId: "51860504904013",
      },
      {
        id: "spoofer-pro-1m",
        name: "1 Month",
        price: 29.99,
        displayPrice: "$29.99",
        shopifyVariantId: "51860504936781",
      },
    ],
    tag: "ALL",
    description: "Advanced temporary HWID spoofer with enhanced features, currently under update.",
    longDescription:
      "The Temp Pro HWID Spoofer offers next-level temporary hardware ID masking for a wide array of games. Featuring enhanced compatibility, deeper system-level spoofing, and a user-friendly interface. Currently undergoing an update to bring you even more robust protection and features. Ideal for users needing reliable and powerful temporary spoofing.",
  },
  // Call of Duty Products
  {
    id: "cod-bo6-blaze",
    name: "[COD] CDN BO6 Blaze",
    displayName: "CDN BO6 Blaze",
    slug: "cod-bo6-blaze",
    category: "call-of-duty",
    image: "/images/products/bo6-blaze.png", // Updated
    thumbnailImage: "/images/products/bo6-blaze.png",
    carouselImage: "/images/carousel/cod-hero-v2.png",
    stockStatus: "online",
    features: [
      {
        name: "Advanced Aimbot Suite",
        description: "Humanized aim, prediction, multiple bone selection, and deadzone options.",
        icon: Target,
      },
      {
        name: "Comprehensive Visuals (ESP)",
        description: "Skeleton, Box ESP, Health, Names, Distance, Snaplines, and full RGB customization.",
        icon: EyeIcon,
      },
      { name: "Zombie Mode Support", description: "Dedicated aimbot and ESP features for Zombie mode.", icon: Bot },
      {
        name: "Security & Convenience",
        description: "Stream/Screenshot Proof, HWID Spoofer & Anti-Cheat Blocker included, Controller Compatible.",
        icon: ShieldCheck,
      },
    ],
    detailedFeatureList: [
      { categoryName: "INFO", items: [{ name: "Fully Stream Proof" }, { name: "Fully Screenshot Proof" }] },
      {
        categoryName: "AIMBOT",
        items: [
          { name: "Aimkey: Set your aim key" },
          { name: "Secondary Aimkey: Optional key" },
          { name: "Enable Aimbot" },
          { name: "Aim closest to crosshair" },
          { name: "Humanize Aim" },
          { name: "Randomize Aim Bone" },
          { name: "Enable Prediction" },
          { name: "Bone Select: Head / Neck / Chest / Stomach" },
          { name: "Deadzone Options: FOV & Distance" },
          { name: "Aimbot FOV" },
          { name: "FOV Size" },
          { name: "Smoothness" },
          { name: "Distance" },
        ],
      },
      {
        categoryName: "VISUALS",
        items: [
          { name: "Show Skeleton + Preview" },
          { name: "Show 2D Box / 2D Corner Boxes" },
          { name: "Show 2D Brackets" },
          { name: "Show 3D Boxes" },
          { name: "Show Health Bar" },
          { name: "Show Names" },
          { name: "Show Distance" },
          { name: "Snapline" },
          { name: "Visible Only" },
          { name: "Team Check" },
          { name: "ESP Distance: 0 - 1000" },
          { name: "Crosshair Size: 10 - 135" },
        ],
      },
      {
        categoryName: "RADAR & RGB",
        items: [
          { name: "Enable Radar" },
          { name: "Auto-size / Auto-location" },
          { name: "Crosshair (+)" },
          { name: "Show FOV Circle" },
          { name: "Apply RGB to All Visuals" },
          { name: "2D Box / Corner Box RGB" },
          { name: "Skeleton / Crosshair RGB" },
          { name: "FOV Circle / Distance / Names RGB" },
        ],
      },
      {
        categoryName: "ZOMBIE SUPPORT",
        items: [
          { name: "Aimkey and Secondary Aimkey" },
          { name: "Enable Aimbot for Players" },
          { name: "Enable Aimbot for Zombies" },
          { name: "Smoothness" },
          { name: "Aimbot Distance" },
          { name: "Bone Select" },
        ],
      },
      {
        categoryName: "CUSTOMIZATION",
        items: [
          { name: "Full ESP Color Customization for Visible / Non-visible Features" },
          { name: "Config Saver" },
          { name: "Language Selection: English / Chinese" },
          { name: "Thickness Settings (Skeleton, 2D Brackets, 2D Boxes, Snapline, FOV)" },
        ],
      },
    ],
    requirements: [
      {
        id: "os-cod-blaze",
        label: "Operating System",
        value: "Supports all versions of Windows 10 & Windows 11",
        icon: Monitor,
      },
      { id: "cpu-cod-blaze", label: "Processor", value: "Compatible with AMD and Intel processors", icon: Cpu },
      { id: "platform-cod-blaze", label: "Platforms", value: "BattleNET, Steam, Xbox GamePass", icon: Gamepad },
      { id: "zombie-cod-blaze", label: "Zombie Mode", value: "Supported", icon: Bot },
      { id: "spoofer-cod-blaze", label: "HWID Spoofer", value: "Included", icon: Fingerprint },
      { id: "acblock-cod-blaze", label: "Anti-Cheat Blocker", value: "Integrated", icon: ShieldAlert },
      { id: "controller-cod-blaze", label: "Controller", value: "Compatible", icon: Gamepad2 },
    ],
    purchaseOptions: [
      {
        id: "cod-bo6-1d",
        name: "Day Key",
        price: 4.99,
        displayPrice: "$4.99",
        shopifyVariantId: "51859966787917",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 342090, variantId: 476648 },
      },
      {
        id: "cod-bo6-1w",
        name: "Week Key",
        price: 17.49,
        displayPrice: "$17.49",
        isPopular: true,
        shopifyVariantId: "51859966820685",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 342090, variantId: 476649 },
      },
      {
        id: "cod-bo6-1m",
        name: "Month Key",
        price: 37.49,
        displayPrice: "$37.49",
        shopifyVariantId: "51859966853453",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 342090, variantId: 476650 },
      },
      {
        id: "cod-bo6-lt",
        name: "Lifetime Key",
        price: 124.99,
        displayPrice: "$124.99",
        shopifyVariantId: "placeholder-cod-bo6-lt",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 342090, variantId: 476650 },
      },
    ],
    tag: "COD",
    description:
      "Dominate Black Ops 6 with the ultimate enhancement suite. Precision aim, full ESP, and advanced tactical tools.",
    longDescription:
      "Unleash the full potential of your gameplay in Call of Duty: Black Ops 6 with CDN BO6 Blaze. This premium software package is engineered for champions, offering a suite of features including a highly configurable precision aimbot, comprehensive ESP (see players, items, and objectives through walls), constant UAV, silent aim capabilities, and flawless no-recoil. Our cutting-edge security measures ensure you stay undetected while climbing the ranks. Regular updates keep Blaze at the forefront of BO6 enhancements.",
  },
]

export function getAllProducts(): Product[] {
  return products
}
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
export function getProductsByCategory(category: Exclude<ProductCategory, "all">): Product[] {
  return products.filter((p) => p.category === category)
}

// Ensure all existing purchaseOptions are retained for brevity
products.forEach((p) => {
  if (p.id === "fn-supreme") {
    p.purchaseOptions = [
      {
        id: "fn-sup-1d",
        name: "1 Day",
        price: 8.99,
        displayPrice: "$8.99",
        shopifyVariantId: "51859968459085",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370126, variantId: 521994 },
      },
      {
        id: "fn-sup-1w",
        name: "1 Week",
        price: 27.99,
        displayPrice: "$27.99",
        isPopular: true,
        shopifyVariantId: "51859968491853",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370126, variantId: 521995 },
      },
      {
        id: "fn-sup-1m",
        name: "1 Month",
        price: 44.99,
        displayPrice: "$44.99",
        shopifyVariantId: "51859968524621",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370126, variantId: 521996 },
      },
    ]
  } else if (p.id === "fn-private") {
    p.purchaseOptions = [
      {
        id: "fn-priv-1d",
        name: "1 Day",
        price: 9.99,
        displayPrice: "$9.99",
        shopifyVariantId: "51859968131405",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 521990 },
      },
      {
        id: "fn-priv-3d",
        name: "3 Days",
        price: 17.99,
        displayPrice: "$17.99",
        shopifyVariantId: "placeholder-fn-priv-3d",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 522032 },
      },
      {
        id: "fn-priv-1w",
        name: "1 Week",
        price: 33.99,
        displayPrice: "$33.99",
        isPopular: true,
        shopifyVariantId: "51859968164173",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 521991 },
      },
      {
        id: "fn-priv-1m",
        name: "1 Month",
        price: 64.99,
        displayPrice: "$64.99",
        shopifyVariantId: "51859968196941",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 521992 },
      },
      {
        id: "fn-priv-lt",
        name: "Lifetime",
        price: 299.99,
        displayPrice: "$299.99",
        shopifyVariantId: "placeholder-fn-priv-lt",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370125, variantId: 521993 },
      },
    ]
  } else if (p.id === "rust-supreme") {
    p.purchaseOptions = [
      {
        id: "rust-sup-1d",
        name: "1 Day",
        price: 8.99,
        displayPrice: "$8.99",
        shopifyVariantId: "51859967770957",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370124, variantId: 370126 },
      },
      {
        id: "rust-sup-1w",
        name: "1 Week",
        price: 34.99,
        displayPrice: "$34.99",
        isPopular: true,
        shopifyVariantId: "51859967803725",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370124, variantId: 521995 },
      },
      {
        id: "rust-sup-1m",
        name: "1 Month",
        price: 64.99,
        displayPrice: "$64.99",
        shopifyVariantId: "51860506476877",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370124, variantId: 521996 },
      },
    ]
  } else if (p.id === "rust-ultimate") {
    p.purchaseOptions = [
      {
        id: "rust-ult-1d",
        name: "1 Day",
        price: 7.99,
        displayPrice: "$7.99",
        shopifyVariantId: "51859967476045",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 521982 },
      },
      {
        id: "rust-ult-3d",
        name: "3 Days",
        price: 15.99,
        displayPrice: "$15.99",
        shopifyVariantId: "placeholder-rust-ult-3d",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 522026 },
      },
      {
        id: "rust-ult-1w",
        name: "1 Week",
        price: 29.99,
        displayPrice: "$29.99",
        isPopular: true,
        shopifyVariantId: "51859967508813",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 521983 },
      },
      {
        id: "rust-ult-1m",
        name: "1 Month",
        price: 59.99,
        displayPrice: "$59.99",
        shopifyVariantId: "51859967541581",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 521984 },
      },
      {
        id: "rust-ult-lt",
        name: "Lifetime",
        price: 299.99,
        displayPrice: "$299.99",
        shopifyVariantId: "placeholder-rust-ult-lt",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370123, variantId: 521985 },
      },
    ]
  } else if (p.id === "r6-ultimate") {
    p.purchaseOptions = [
      {
        id: "r6-ult-1d",
        name: "1 Day",
        price: 6.79,
        displayPrice: "$6.79",
        shopifyVariantId: "51860027834701",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370127, variantId: 521998 },
      },
      {
        id: "r6-ult-1w",
        name: "1 Week",
        price: 27.99,
        displayPrice: "$27.99",
        shopifyVariantId: "51860506280269",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370127, variantId: 521999 },
      },
      {
        id: "r6-ult-1m",
        name: "1 Month",
        price: 59.99,
        displayPrice: "$59.99",
        shopifyVariantId: "51860506313037",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370127, variantId: 522000 },
      },
    ]
  } else if (p.id === "spoofer-perma") {
    p.purchaseOptions = [
      {
        id: "spoofer-perma-onetime",
        name: "Onetime",
        price: 19.99,
        displayPrice: "$19.99",
        isPopular: true,
        shopifyVariantId: "51899275641165",
      },
      {
        id: "spoofer-perma-lifetime",
        name: "Lifetime",
        price: 69.99,
        displayPrice: "$69.99",
        shopifyVariantId: "51899275673933",
      },
    ]
  } else if (p.id === "spoofer-temp-v2") {
    p.purchaseOptions = [
      {
        id: "spoofer-v2-15d",
        name: "15 Days",
        price: 27.99,
        displayPrice: "$27.99",
        isPopular: true,
        shopifyVariantId: "51860034453837",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370128, variantId: 522002 },
      },
      {
        id: "spoofer-v2-30d",
        name: "30 Days",
        price: 46.99,
        displayPrice: "$46.99",
        shopifyVariantId: "51860505035085",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370128, variantId: 522003 },
      },
      {
        id: "spoofer-v2-90d",
        name: "90 Days",
        price: 118.99,
        displayPrice: "$118.99",
        shopifyVariantId: "51860505067853",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 370128, variantId: 522004 },
      },
    ]
  } else if (p.id === "spoofer-temp-pro") {
    p.purchaseOptions = [
      { id: "spoofer-pro-1d", name: "1 Day", price: 4.99, displayPrice: "$4.99", shopifyVariantId: "51860044513613" },
      {
        id: "spoofer-pro-1w",
        name: "1 Week",
        price: 19.99,
        displayPrice: "$19.99",
        isPopular: true,
        shopifyVariantId: "51860504904013",
      },
      {
        id: "spoofer-pro-1m",
        name: "1 Month",
        price: 29.99,
        displayPrice: "$29.99",
        shopifyVariantId: "51860504936781",
      },
    ]
  } else if (p.id === "cod-bo6-blaze") {
    p.purchaseOptions = [
      {
        id: "cod-bo6-1d",
        name: "Day Key",
        price: 4.99,
        displayPrice: "$4.99",
        shopifyVariantId: "51859966787917",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 342090, variantId: 476648 },
      },
      {
        id: "cod-bo6-1w",
        name: "Week Key",
        price: 17.49,
        displayPrice: "$17.49",
        isPopular: true,
        shopifyVariantId: "51859966820685",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 342090, variantId: 476649 },
      },
      {
        id: "cod-bo6-1m",
        name: "Month Key",
        price: 37.49,
        displayPrice: "$37.49",
        shopifyVariantId: "51859966853453",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 342090, variantId: 476650 },
      },
      {
        id: "cod-bo6-lt",
        name: "Lifetime Key",
        price: 124.99,
        displayPrice: "$124.99",
        shopifyVariantId: "placeholder-cod-bo6-lt",
        saInfo: { shopId: SELLAUTH_SHOP_ID, productId: 342090, variantId: 476650 },
      },
    ]
  }
})
