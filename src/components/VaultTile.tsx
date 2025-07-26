export type VaultTileProps = {
  title: string
  description: string
  image: string
  ctaLink: string
}

export const VaultTile = ({ title, description, image, ctaLink }: VaultTileProps) => (
  <div className="rounded-xl shadow-md overflow-hidden bg-white">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600 mt-2 mb-4">{description}</p>
      <a href={ctaLink} className="text-anchor-600 hover:underline font-medium">
        View Product →
      </a>
    </div>
  </div>
)