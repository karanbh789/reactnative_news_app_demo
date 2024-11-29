# News Reader App

A simple and performant React Native news reader app that fetches articles from the [NewsAPI](https://newsapi.org/), displays a list of news articles, and allows the user to view detailed articles with images and share functionality. This app also supports offline caching.

## Features

- **News Feed**: Displays a list of articles with title, summary, and thumbnail.
- **Article Detail**: View the full article content with images and a share button.
- **Offline Support**: Cache the most recent articles for offline viewing.
- **Error Handling**: Graceful error messages when API fetch fails or there’s no internet connection.
- **Pull-to-Refresh**: Refresh the news feed by pulling down.
- **Cross-Platform**: Fully functional on both iOS and Android.

## Installation

Follow these steps to set up and run the app on your local machine.

### Prerequisites

- Node.js >= 18
- Yarn or npm
- React Native CLI
- Android Studio or Xcode for emulator setup

### 1. Clone the Repository

```bash
git clone https://github.com/karanbh789/reactnative_news_app_demo.git
cd reactnative_news_app_demo
```

### 2. Install Dependencies

Using npm:

```bash
npm install
or
yarn install
```

### 3. Run Android

```bash
npm run android
or
yarn android
```

### 4. iOS Pod Install

```bash
cd ios
pod install
```

### 5. Run iOS

```bash
npm run ios
or
yarn ios
```
