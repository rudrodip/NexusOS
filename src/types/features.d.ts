export type featureCardOne = {
  name: string,
  desc: {
    title: string,
    sub: string,
  },
  FeatureCard: React.JSX
}

export type featureCardTwo = {
  desc: string,
  punchques: string,
  punchlines: string[],
  link: {
    text: string,
    url: string,
  },
  FeatureCard: React.JSX
}