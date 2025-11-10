import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function CarViewer() {
  const route = useRoute();
  const navigation = useNavigation();
  const { car } = route.params || {};
  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = Platform.OS === 'web' && width >= 1024;
  const viewerHeight = isDesktop ? 600 : isTablet ? 480 : 320;

  // Demo assets (remplaçables):
  const modelUrl = car?.modelUrl || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Buggy/glTF-Binary/Buggy.glb';
  const hdriUrl = 'https://modelviewer.dev/shared-assets/environments/spruit_sunrise_1k_HDR.hdr';
  const interiorPanoramaUrl = car?.interiorPanoramaUrl || 'https://pannellum.org/images/alma.jpg';

  const modelHtml = useMemo(() => `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
        <style>
          html, body { margin:0; padding:0; background:#0b1020; }
          model-viewer { width: 100vw; height: ${viewerHeight}px; background: #0b1020; }
          .label { position: absolute; top: 8px; left: 12px; color: #e8eaf6; font-family: sans-serif; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="label">Rotation 360° extérieur</div>
        <model-viewer
          src="${modelUrl}"
          ar
          camera-controls
          touch-action="pan-y"
          tone-mapping="aces"
          exposure="1.0"
          environment-image="${hdriUrl}"
          shadow-intensity="1"
          shadow-softness="0.5"
          poster=""
          disable-zoom="false"
        ></model-viewer>
      </body>
    </html>
  `, [modelUrl, viewerHeight]);

  const panoHtml = useMemo(() => `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="stylesheet" href="https://unpkg.com/photo-sphere-viewer@5/dist/photo-sphere-viewer.css" />
        <script src="https://unpkg.com/uevent@2/browser.js"></script>
        <script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
        <script src="https://unpkg.com/photo-sphere-viewer@5/dist/photo-sphere-viewer.js"></script>
        <style>
          html, body { margin:0; padding:0; background:#0b1020; }
          #viewer { width: 100vw; height: ${viewerHeight}px; }
          .label { position: absolute; top: 8px; left: 12px; color: #e8eaf6; font-family: sans-serif; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="label">Panorama intérieur</div>
        <div id="viewer"></div>
        <script>
          const viewer = new PhotoSphereViewer.Viewer({
            container: document.getElementById('viewer'),
            panorama: '${interiorPanoramaUrl}',
            touchmoveTwoFingers: true,
            navbar: ['zoom', 'fullscreen'],
            defaultYaw: 0,
          });
        </script>
      </body>
    </html>
  `, [interiorPanoramaUrl, viewerHeight]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{car ? `${car.brand} ${car.model}` : 'Viewer 360°'}</Text>

      <View style={[styles.card, { height: viewerHeight }]}>
        <WebView originWhitelist={["*"]} source={{ html: modelHtml }} style={styles.web} />
      </View>

      <View style={[styles.card, { height: viewerHeight, marginTop: 12 }]}>
        <WebView originWhitelist={["*"]} source={{ html: panoHtml }} style={styles.web} />
      </View>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1020',
    padding: 12,
  },
  title: {
    color: '#e8eaf6',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#111834',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1b2750',
    overflow: 'hidden',
  },
  web: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  backBtn: {
    backgroundColor: '#4c6fff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 14,
  },
  backText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
