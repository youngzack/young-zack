'use client'

import { FaSpotify, FaApple, FaSoundcloud, FaInstagram, FaYoutube } from 'react-icons/fa'
import { siteConfig } from '@/config/site'

type LinkStyle = 'pills' | 'icons' | 'cards' | 'neon'

interface StreamingLinksProps {
  style?: LinkStyle
}

export default function StreamingLinks({ style = 'neon' }: StreamingLinksProps) {
  const links = [
    { name: 'Spotify', url: siteConfig.socialLinks.spotify, icon: FaSpotify, color: 'from-green-500 to-green-600', bgColor: 'bg-green-600', hoverColor: 'hover:bg-green-700' },
    { name: 'Apple Music', url: siteConfig.socialLinks.appleMusic, icon: FaApple, color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-600', hoverColor: 'hover:bg-pink-700' },
    { name: 'SoundCloud', url: siteConfig.socialLinks.soundcloud, icon: FaSoundcloud, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-600', hoverColor: 'hover:bg-orange-700' },
    { name: 'YouTube', url: siteConfig.socialLinks.youtube, icon: FaYoutube, color: 'from-red-500 to-red-600', bgColor: 'bg-red-600', hoverColor: 'hover:bg-red-700' },
    { name: 'Instagram', url: siteConfig.socialLinks.instagram, icon: FaInstagram, color: 'from-purple-500 via-pink-500 to-orange-500', bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600', hoverColor: 'hover:from-purple-700 hover:to-pink-700' },
  ]

  // Style 1: Neon Glow Effect (COOLEST!)
  if (style === 'neon') {
    return (
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${link.color} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 rounded-full`}></div>
              
              {/* Button */}
              <div className={`relative flex items-center gap-3 bg-gradient-to-r ${link.color} px-8 py-4 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}>
                <Icon size={28} className="drop-shadow-lg" />
                <span className="font-bold text-lg drop-shadow-lg">{link.name}</span>
              </div>
            </a>
          )
        })}
      </div>
    )
  }

  // Style 2: Large Icon Circles
  if (style === 'icons') {
    return (
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              {/* Icon circle */}
              <div className={`w-20 h-20 ${link.bgColor} ${link.hoverColor} rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 shadow-xl`}>
                <Icon size={40} />
              </div>
              <span className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">{link.name}</span>
            </a>
          )
        })}
      </div>
    )
  }

  // Style 3: Card Style
  if (style === 'cards') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 max-w-4xl mx-auto">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.bgColor} ${link.hoverColor} p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex flex-col items-center gap-3`}
            >
              <Icon size={36} />
              <span className="font-bold text-sm text-center">{link.name}</span>
            </a>
          )
        })}
      </div>
    )
  }

  // Style 4: Pills (Original)
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {links.map((link) => {
        const Icon = link.icon
        return (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 ${link.bgColor} ${link.hoverColor} px-6 py-3 rounded-full transition-colors`}
          >
            <Icon size={24} />
            <span className="font-semibold">{link.name}</span>
          </a>
        )
      })}
    </div>
  )
}

