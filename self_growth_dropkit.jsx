import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, FolderDown } from 'lucide-react'

const SelfGrowthDropKit = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">🧠 Self-Growth Content Vault: Creator Edition</h1>

      <Card className="shadow-lg border border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Brain className="w-8 h-8 text-emerald-600" />
            <div>
              <h2 className="text-xl font-semibold">Personal Development, Resilience, and PLR Gold</h2>
              <p className="text-sm text-muted-foreground">
                Editable articles, training decks, tweet packs, and more — built for creators and coaches ready to build, share, or sell.
              </p>
            </div>
          </div>

          <ul className="list-disc list-inside mb-6 text-sm text-gray-700">
            <li>10+ editable articles and mini-devotionals</li>
            <li>4 fully designed PowerPoint slide decks</li>
            <li>90 ready-to-post tweets and graphics</li>
            <li>Audio, transcripts, blog headers, and more</li>
            <li>Full PLR license — resell or repackage as you wish</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="w-full sm:w-auto" asChild>
              <a href="/vault/Self_Growth_Content_Vault_Creator_Edition.zip" download>
                <FolderDown className="w-4 h-4 mr-2" /> Download Full Kit
              </a>
            </Button>

            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <a href="/vault/Self_Growth_Teaser_Sampler.zip" download>
                🎁 Get the Free Teaser Sample
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SelfGrowthDropKit
