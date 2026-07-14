FROM nginx:1.25-alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets to prevent conflicts
RUN rm -rf ./*

# Copy core application files
COPY index.html ./
COPY all_questions.json ./

# Ensure correct permissions for the web root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose standard web port
EXPOSE 80

# Healthcheck to verify the web server is responsive
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]