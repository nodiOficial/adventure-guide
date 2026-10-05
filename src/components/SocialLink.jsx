import { Globe, Star } from 'lucide-react'
import AdventureLink from './AdventureLink'
import { FacebookIcon, InstagramIcon } from './BrandIcons'

const ICONS = {
  website: <Globe size={22} strokeWidth={2} />,
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  review: <Star size={22} strokeWidth={2} />,
}

/** Maps an entry from `config/links.js` to an AdventureLink with the right icon */
export default function SocialLink({ icon, ...link }) {
  return <AdventureLink icon={ICONS[icon] ?? ICONS.website} {...link} />
}
