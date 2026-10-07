/**
 * PLACEHOLDER CONTENT — these are sample entries so the layout can be reviewed.
 * Replace them with real, attributable customer feedback before launch.
 */
export type Testimonial = {
  name: string;
  rating: number;
  text: string;
  date: string;
  column: 0 | 1 | 2;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sample Customer A",
    rating: 5,
    column: 0,
    date: "10:06 AM · Feb 2, 2023",
    text: "Placeholder: describe how the product fits your business, what changed after adopting it, and why you would recommend it to a colleague. Keep it specific and honest — real quotes convert better than generic praise.",
  },
  {
    name: "Sample Customer B",
    rating: 5,
    column: 1,
    date: "15:06 PM · Apr 12, 2023",
    text: "Placeholder: a short quote about day-to-day use goes here, ideally one concrete result.",
  },
  {
    name: "Sample Customer C",
    rating: 5,
    column: 1,
    date: "12:35 AM · May 12, 2023",
    text: "Placeholder: a one-line reaction from a customer.",
  },
  {
    name: "Sample Customer D",
    rating: 5,
    column: 2,
    date: "09:06 AM · Mar 12, 2023",
    text: "Placeholder: a longer story about switching tools — what was hard before, what was easy after, how the team adopted it, and how the data and communication with clients improved.",
  },
];
