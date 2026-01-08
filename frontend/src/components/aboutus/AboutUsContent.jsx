import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const AboutUsContent = () => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-6">Walking Together Through Time</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Since 1995, EcoSprint has revolutionized the footwear industry by blending traditional craftsmanship with cutting-edge innovation. Every pair of shoes tells a story of dedication, sustainability, and the pursuit of perfect comfort.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          <p className="text-lg text-gray-700">
            In the heart of Dehradun's artisan district, EcoSprint began in a humble workshop where master craftsman Gulshan Bhandari created bespoke footwear for local customers. His son Suresh, fascinated by the artistry of shoemaking from an early age, spent countless hours watching her father transform raw leather into beautiful, comfortable shoes.
          </p>
          <p className="text-lg text-gray-700">
            Suresh's journey took her from sweeping workshop floors to studying sustainable design in Mumbai. When he returned in 1995, he combined his father's traditional techniques with innovative eco-friendly materials, launching what would become EcoSprint's signature approach to footwear creation.
          </p>
          <p className="text-lg text-gray-700">
            Today, EcoSprint operates globally, but we haven't forgotten our roots. Each shoe still passes through the hands of skilled artisans who inspect every stitch, ensuring we maintain the quality that made us famous. Our Dehradun workshop, now a heritage site, continues to produce limited-edition collections and serves as a training ground for the next generation of craftspeople.
          </p>
        </div>
        <div className="bg-gray-100 rounded-2xl p-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">Our Core Values</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <ArrowUpRight className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Artisanal Excellence</h4>
                  <p className="text-gray-600">Every pair of EcoSprint shoes undergoes 47 distinct quality checks. Our master craftspeople average 15 years of experience, ensuring unprecedented attention to detail and quality.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ArrowUpRight className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Environmental Stewardship</h4>
                  <p className="text-gray-600">We've pioneered the use of recycled ocean plastics and regenerative leather. Our zero-waste workshops operate on 100% renewable energy, setting new industry standards for sustainability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ArrowUpRight className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">Community Impact</h4>
                  <p className="text-gray-600">Through our "Steps Forward" program, we've trained over 500 young artisans and donated 100,000 pairs of shoes to communities in need. Every purchase supports local crafting traditions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">1995</h3>
            <p className="text-gray-700">Suresh Bhandari opens the first EcoSprint workshop, combining traditional craftsmanship with innovative designs.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">2005</h3>
            <p className="text-gray-700">Launch of EcoSprint™ collection, featuring the world's first carbon-negative running shoe.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">2015</h3>
            <p className="text-gray-700">Establishment of the EcoSprint Craft Academy, preserving traditional shoemaking techniques.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">2023</h3>
            <p className="text-gray-700">Achieved B-Corp certification and opened our 100th sustainable workshop worldwide.</p>
          </div>
        </div>
      </div>

      {/* Innovation Section */}
      <div className="mt-16 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Innovation Meets Tradition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainable Materials</h3>
            <p className="text-gray-700">
              Our revolutionary EcoWeave™ fabric combines recycled ocean plastics with natural hemp fibers, creating durable, breathable footwear that's kind to the planet. Each pair of shoes repurposes approximately 12 plastic bottles while maintaining premium comfort and style.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Artisanal Craftsmanship</h3>
            <p className="text-gray-700">
              Every EcoSprint shoe is touched by at least 23 skilled artisans during its creation. From our hand-stitched uppers to our precision-molded soles, each element is crafted with meticulous attention to detail and quality.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Promise</h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          With every step you take in EcoSprint shoes, you're walking with three generations of craftsmanship, innovative sustainability, and a commitment to excellence. We're not just making shoes; we're crafting a better future for our planet and communities, one step at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutUsContent;