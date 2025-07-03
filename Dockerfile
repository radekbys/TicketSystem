# Use official python image
FROM python:3.12.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    netcat-openbsd gcc libpq-dev curl && \
    apt-get clean

WORKDIR /TicketSystem-backend

# Copy requirements and install
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements-backend.txt

# Copy your app code
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start server with Gunicorn
CMD gunicorn TicketSystem.wsgi:application \
    --bind 0.0.0.0:8080 \
    --workers 3