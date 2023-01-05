import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";


const ReportPDF = ({products}: any) => {
    console.log(products)
    return (
        <Document>
            <Page size={'A4'}>
                <View>
                    <View >
                        <View >
                            <Text>Products Stock</Text>
                        </View>
                    </View>
                    <View >
                        <View >
                            <View>
                                <View>
                                    <View>
                                        <View><Text>Code</Text></View><View><Text>Product Name</Text></View><View><Text>Stock</Text></View>
                                    </View>
                                </View>
                                <View>

                                    
                                    {
                                        products &&
                                        products.map((row: any, index: any) => {
                                            return (
                                                <View key={row.id}>
                                                    <View><Text>{row.code}</Text></View><View><Text>{row.productName}</Text></View>
                                                    <View ><Text>{row.stock}</Text></View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}

export default ReportPDF