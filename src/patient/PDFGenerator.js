import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Définition du style pour le PDF
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  patientInfo: {
    marginBottom: 10,
  },
});

// Composant de génération du PDF
const PDFGenerator = ({ patientData }) => {
  return (
    <div>
      <PDFDownloadLink document={<MyDocument patientData={patientData} />} fileName="patient.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Chargement...' : 'Télécharger le PDF')}
      </PDFDownloadLink>
    </div>
  );
};

// Composant Document pour React PDF Renderer
const MyDocument = ({ patientData }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src="../images/logo-pdf.jpg" />
          <Text>Informations du patient</Text>
        </View>
        <View style={styles.patientInfo}>
          <Text>Nom: {patientData.name}</Text>
          <Text>Age: {patientData.age}</Text>
          <Text>Adresse: {patientData.address}</Text>
          {/* Ajouter d'autres données de patient ici */}
        </View>
      </Page>
    </Document>
  );
};

export default PDFGenerator;
