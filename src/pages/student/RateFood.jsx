import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/helpers';

const mealItems = [
  { id: 1, name: 'Aloo Paratha', type: 'Breakfast' },
  { id: 2, name: 'Curd', type: 'Breakfast' },
];

const tagsList = ['Too Oily', 'Too Spicy', 'Too Salty', 'Cold Food', 'Stale', 'Low Quantity', 'Poor Taste', 'Repetitive'];

export default function RateFood() {
  const [ratings, setRatings] = useState({});
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (id, rating) => {
    setRatings(prev => ({ ...prev, [id]: rating }));
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
    setTimeout(() => {
      setRatings({});
      setSelectedTags([]);
      setComment('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Rate Today's Food</h2>
          <p className="text-text-secondary text-sm mt-1">Your feedback directly impacts upcoming menus.</p>
        </div>
      </div>

      <div className="glass-card p-6 md:p-8">
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="fill-success" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Feedback Received</h3>
            <p className="text-text-secondary">Thank you! Your ratings have been submitted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Meal Items Rating */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white border-b border-glass-border pb-2">Breakfast Items</h3>
              {mealItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface border border-glass-border hover:border-primary/30 transition-colors">
                  <span className="font-medium text-white mb-3 sm:mb-0">{item.name}</span>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRate(item.id, star)}
                        className={cn(
                          "transition-colors",
                          (ratings[item.id] || 0) >= star ? "text-primary" : "text-text-secondary hover:text-primary/50"
                        )}
                      >
                        <Star className={(ratings[item.id] || 0) >= star ? "fill-primary" : ""} size={24} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Tags */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Quick Tags (Issues)</h3>
              <div className="flex flex-wrap gap-2">
                {tagsList.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                      selectedTags.includes(tag) 
                        ? "bg-primary text-black border-primary shadow-[0_0_10px_rgba(255,184,0,0.3)]" 
                        : "bg-surface border-glass-border text-text-secondary hover:border-primary/50"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Additional Comments</label>
              <textarea
                className="input-glass w-full min-h-[120px] resize-y"
                placeholder="Tell us what could be better..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={Object.keys(ratings).length === 0 && selectedTags.length === 0 && !comment}
              className="w-full btn-primary h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
