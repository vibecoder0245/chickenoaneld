"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-blue-900/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our cheats come with a wide range of features to enhance your gaming experience
          </p>
        </div>

        <Tabs defaultValue="aimbot" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <TabsTrigger
                value="aimbot"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3"
              >
                Aimbot
              </TabsTrigger>
              <TabsTrigger
                value="visuals"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3"
              >
                Visuals
              </TabsTrigger>
              <TabsTrigger
                value="misc"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white px-6 py-3"
              >
                Misc
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="aimbot" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Aimbot Features</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Active Aimbot</span> - enable aimbot, aiming assistance when
                        shooting
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Aimbot Keys</span> - ability to set 2 keys to activate the aimbot
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">FOV Size</span> - the size of the area within which the aimbot
                        will capture targets
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Draw FOV</span> - show the size of the aimbot's working area as a
                        circle around the sight
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Hitboxes</span> - selection of body parts (bones) that the aimbot
                        will aim at during operation
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                <div className="relative h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/80 backdrop-blur-md p-6 rounded-lg border border-gray-800 w-[80%] max-w-md">
                      <h4 className="text-xl font-bold mb-4 text-center">Aim Settings</h4>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Active Aimbot</span>
                          <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                            <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Aimbot Keys</span>
                          <div className="flex space-x-2">
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">Right Mouse</div>
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">Left Mouse</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Draw FOV</span>
                          <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                            <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span>Mark Target</span>
                          <div className="flex space-x-2">
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">Head</div>
                            <div className="bg-gray-800 text-white px-2 py-1 rounded text-sm">Neck</div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span>FOV Size</span>
                            <span>10</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full">
                            <div className="h-2 bg-blue-600 rounded-full w-1/4"></div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span>Sensitivity</span>
                            <span>4</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full">
                            <div className="h-2 bg-blue-600 rounded-full w-1/3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="visuals" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Visuals Features</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Player ESP</span> - esp for rainbow, shows players
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">ESP Box</span> - ESP in the form of boxes
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">ESP Line</span> - (Up, Center, Bottom) - wh in the form of lines
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Player Distance</span> - distance in meters to enemies
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Skeleton</span> - wallhack in the form of skeletons
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">More Visuals Features</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Name</span> - players' nicknames
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Head</span> - select head hitbox separately using ESP
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Health (Bar, Text)</span> - display of players' HP
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Team Check</span> - if you check this box, allies will not be
                        shown (don't check this in arcade)
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Max Distance</span> - limit the range of the wallhack
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="misc" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Misc Features</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">No Recoil</span> - eliminates weapon recoil for precise shooting
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Rapid Fire</span> - increases weapon fire rate
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Bunny Hop</span> - automatic jumping for increased mobility
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Radar Hack</span> - shows enemies on the radar
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Triggerbot</span> - automatically shoots when crosshair is on
                        enemy
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-6">Advanced Features</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Config System</span> - save and load your custom settings
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Panic Key</span> - instantly disable all cheat features
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Stream Proof</span> - invisible to streaming and recording
                        software
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Auto Update</span> - keeps your cheats up to date with game
                        patches
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600/20 p-1 rounded-full mr-3 mt-1">
                        <svg
                          className="w-3 h-3 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <div>
                        <span className="font-medium">Custom UI</span> - fully customizable user interface
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Try to interact with our demo interface!</p>
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800 max-w-xl mx-auto">
            <div className="text-xl font-bold mb-4">Yes it's that easy</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Aimbot</span>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>LBUTTON</span>
                <div className="bg-gray-800 text-white px-3 py-1 rounded text-sm">Aimbot</div>
              </div>
              <div className="flex items-center justify-between">
                <span>Visible Only</span>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Silent Aim</span>
                <div className="w-12 h-6 bg-gray-700 rounded-full relative">
                  <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Aimbot Smoothing</span>
                  <span>4</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full w-1/3"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>Aimbot FOV</span>
                  <span>10</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
