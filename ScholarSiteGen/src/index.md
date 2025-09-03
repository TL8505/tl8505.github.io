---
layout: base.njk
title: "Home"
permalink: "/"
eleventyNavigation:
  key: Home
  order: 1
---

<div class="hero">
  <h1>Welcome to {{ site.title }}</h1>
  <p class="hero-subtitle">{{ site.description }}</p>
  
  <div class="hero-actions">
    <a href="/about/" class="btn btn-primary">About Me</a>
    <a href="/publications/" class="btn btn-secondary">Publications</a>
    <a href="/contact/" class="btn btn-secondary">Contact</a>
  </div>
</div>

<div class="home-sections">
  <section class="home-section">
    <h2>Recent Publications</h2>
    {% for pub in publications | limit(3) %}
    <article class="publication-preview">
      <h3><a href="/publications/">{{ pub.title }}</a></h3>
      <div class="publication-meta">
        <span class="authors">{{ pub.authors }}</span>
        <span class="venue">{{ pub.venue }}, {{ pub.year }}</span>
      </div>
    </article>
    {% endfor %}
    <a href="/publications/" class="view-more">View all publications →</a>
  </section>

  <section class="home-section">
    <h2>Latest Blog Posts</h2>
    {% for post in collections.posts | limit(3) %}
    <article class="post-preview">
      <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
      <div class="post-meta">
        <time datetime="{{ post.date | date }}">{{ post.date | dateDisplay }}</time>
      </div>
      {% if post.data.excerpt %}
      <p>{{ post.data.excerpt }}</p>
      {% else %}
      <p>{{ post.templateContent | excerpt }}</p>
      {% endif %}
    </article>
    {% endfor %}
    <a href="/blog/" class="view-more">View all posts →</a>
  </section>

  <section class="home-section">
    <h2>Research Interests</h2>
    <div class="research-topics">
      <div class="topic">
        <h3>Machine Learning</h3>
        <p>Deep learning, neural networks, and AI applications</p>
      </div>
      <div class="topic">
        <h3>Computer Vision</h3>
        <p>Image processing, object detection, and visual recognition</p>
      </div>
      <div class="topic">
        <h3>Natural Language Processing</h3>
        <p>Text analysis, language models, and computational linguistics</p>
      </div>
    </div>
  </section>
</div>