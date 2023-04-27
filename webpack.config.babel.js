import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

module.exports = {
  entry: {
    'common/utils/clone': './src/common/utils/clone',
    'common/utils/pricing_matrix': './src/common/utils/pricing_matrix',
    'core/utils/prepareQueryString': './src/core/utils/prepareQueryString',
    'common/utils/numbers': './src/common/utils/numbers',
    'common/utils/resolvePromises': './src/common/utils/resolvePromises',
    'common/utils/holdPromise': './src/common/utils/holdPromise',

    'core/utils/initCore': './src/core/utils/initCore',

    'DefinitiveFiltersRequest/DefinitiveFiltersRequest':
      './src/Request/DefinitiveFiltersRequest/entity/DefinitiveFiltersRequest',

    'UUID/UUID': './src/UUID/UUID',
    'Api/repository/ApiRepository': './src/Api/repository/ApiRepository',

    'Authenticator/enums/AuthProvider': './src/Authenticator/enums/AuthProvider',
    'Authenticator/enums/GrantType': './src/Authenticator/enums/GrantType',
    'Authenticator/enums/RoleScopeType': './src/Authenticator/enums/RoleScopeType',
    'Authenticator/enums/Permission': './src/Authenticator/enums/Permission',
    'Authenticator/enums/GlobalPermission': './src/Authenticator/enums/GlobalPermission',
    'Authenticator/enums/Platform': './src/Authenticator/enums/Platform',
    'Authenticator/enums/Role': './src/Authenticator/enums/Role',

    'Authenticator/utils/extractUserBusinessRole': './src/Authenticator/utils/extractUserBusinessRole',

    'DateTimeZone/entity/DateTimeZone': './src/DateTimeZone/entity/DateTimeZone',

    'PhoneNumber/entity/PhoneNumber': './src/PhoneNumber/entity/PhoneNumber',

    'City/entity/City': './src/City/entity/City',
    'City/repository/CityRepository': './src/City/repository/CityRepository',

    'Stop/entity/Stop': './src/Stop/entity/Stop',
    'Stop/repository/StopRepository': './src/Stop/repository/StopRepository',

    'Concession/entity/Concession': './src/Concession/entity/Concession',
    'Concession/enums/ConcessionValueModifier': './src/Concession/enums/ConcessionValueModifier',
    'Concession/repository/ConcessionRepository': './src/Concession/repository/ConcessionRepository',

    'RouteStop/entity/RouteStop': './src/RouteStop/entity/RouteStop',

    'Route/entity/Route': './src/Route/entity/Route',
    'Route/repository/RouteRepository': './src/Route/repository/RouteRepository',

    'RouteGroup/entity/RouteGroup': './src/RouteGroup/entity/RouteGroup',
    'RouteGroup/repository/RouteGroupRepository': './src/RouteGroup/repository/RouteGroupRepository',

    'JourneyStop/entity/JourneyStop': './src/JourneyStop/entity/JourneyStop',

    'ProductPurchase/entity/ProductPurchase': './src/ProductPurchase/entity/ProductPurchase',
    'ProductPurchase/repository/ProductPurchaseRepository':
      './src/ProductPurchase/repository/ProductPurchaseRepository',
    'ProductPurchase/enums/ProductPurchaseType': './src/ProductPurchase/enums/ProductPurchaseType',

    'Location/entity/Location': './src/Location/entity/Location',
    'Location/repository/LocationRepository': './src/Location/repository/LocationRepository',

    'Google/services/GoogleService': './src/Google/services/GoogleService',
    'Google/clients/GoogleClient': './src/Google/clients/GoogleClient',

    'Money/entity/Money': './src/Money/entity/Money',
    'Currency/entity/Currency': './src/Currency/entity/Currency',

    'Discount/enums/DiscountType': './src/Discount/enums/DiscountType',
    'Discount/entity/DiscountPercentage': './src/Discount/entity/DiscountPercentage',

    'Driver/entity/Driver': './src/Driver/entity/Driver',
    'Driver/repository/DriverRepository': './src/Driver/repository/DriverRepository',
    'Driver/repository/DriverRepositoryMock': './src/Driver/repository/DriverRepositoryMock',
    'Driver/enums/ComplianceStatus': './src/Driver/enums/ComplianceStatus',

    'DBSCheck/entity/DBSCheckUK': './src/DBSCheck/entity/DBSCheckUK',
    'DBSCheck/enums/DBSValidCertificateType': './src/DBSCheck/enum/DBSValidCertificateType',

    'Operator/entity/Operator': './src/Operator/entity/Operator',
    'Operator/repository/OperatorRepository': './src/Operator/repository/OperatorRepository',

    'Supplier/entity/Supplier': './src/Supplier/entity/Supplier',
    'Supplier/repository/SupplierRepository': './src/Supplier/repository/SupplierRepository',

    'Tag/entity/Tag': './src/Tag/entity/Tag',
    'Tag/repository/TagRepository': './src/Tag/repository/TagRepository',
    'Tag/enums/TagType': './src/Tag/enums/TagType',
    'Tag/utils/getTagRelativeSlug': './src/Tag/utils/getTagRelativeSlug',

    'DataLabel/repository/DataLabelRepository': './src/DataLabel/repository/DataLabelRepository',

    'Perk/entity/Perk': './src/Perk/entity/Perk',

    'Market/entity/Market': './src/Market/entity/Market',
    'Market/repository/MarketRepository': './src/Market/repository/MarketRepository',

    'JourneyVehicle/entity/JourneyVehicle': './src/JourneyVehicle/entity/JourneyVehicle',
    'JourneyVehicle/entity/JourneyVehicleActivity': './src/JourneyVehicle/entity/JourneyVehicleActivity',
    'JourneyVehicle/entity/JourneyVehicleComment': './src/JourneyVehicle/entity/JourneyVehicleComment',
    'JourneyVehicle/entity/JourneyVehicleManualIssue': './src/JourneyVehicle/entity/JourneyVehicleManualIssue',
    'JourneyVehicle/enums/JourneyVehicleDriverAppReportType':
      './src/JourneyVehicle/enums/JourneyVehicleDriverAppReportType',
    'JourneyVehicle/repository/JourneyVehicleRepository': './src/JourneyVehicle/repository/JourneyVehicleRepository',

    'JourneyVehicle/enums/JourneyVehicleStatusType': './src/JourneyVehicle/enums/JourneyVehicleStatusType',
    'JourneyVehicle/enums/JourneyVehicleActivityType': './src/JourneyVehicle/enums/JourneyVehicleActivityType',
    'JourneyVehicle/enums/JourneyVehicleAllocationType': './src/JourneyVehicle/enums/JourneyVehicleAllocationType',
    'JourneyVehicle/enums/JourneyVehicleIssueIssue': './src/JourneyVehicle/enums/JourneyVehicleIssueType',
    'JourneyVehicle/enums/JourneyVehicleReviewStatus': './src/JourneyVehicle/enums/JourneyVehicleReviewStatus',
    'JourneyVehicle/enums/JourneyVehicleIssueType': './src/JourneyVehicle/enums/JourneyVehicleIssueType',
    'JourneyVehicle/enums/JourneyVehicleIssueFault': './src/JourneyVehicle/enums/JourneyVehicleIssueFault',
    'JourneyVehicle/enums/JourneyVehicleIssueSeverity': './src/JourneyVehicle/enums/JourneyVehicleIssueSeverity',
    'JourneyVehicle/enums/JourneyVehicleServiceMetrics': './src/JourneyVehicle/enums/JourneyVehicleServiceMetrics',
    'JourneyVehicle/enums/JourneyVehicleManualIssueCategory':
      './src/JourneyVehicle/enums/JourneyVehicleManualIssueCategory',
    'JourneyVehicle/enums/JourneyVehicleManualIssueReason':
      './src/JourneyVehicle/enums/JourneyVehicleManualIssueReason',
    'JourneyVehicle/enums/JourneyVehicleManualIssueDetail':
      './src/JourneyVehicle/enums/JourneyVehicleManualIssueDetail',

    'JourneyVehicleStop/entity/JourneyVehicleStop': './src/JourneyVehicleStop/entity/JourneyVehicleStop',

    'Image/entity/Image': './src/Image/entity/Image',
    'Image/repository/ImageRepository': './src/Image/repository/ImageRepository',

    'File/entity/File': './src/File/entity/File',
    'File/entity/Document': './src/File/entity/Document',
    'File/repository/FileRepository': './src/File/repository/FileRepository',

    'Journey/api': './src/Journey/api',
    'Journey/entity/Journey': './src/Journey/entity/Journey',
    'Journey/repository/JourneyRepository': './src/Journey/repository/JourneyRepository',
    'Journey/enums/JourneyDirection': './src/Journey/enums/JourneyDirection',
    'Journey/enums/JourneyMessagingTargetOptions': './src/Journey/enums/JourneyMessagingTargetOptions',

    'JourneyGroup/entity/JourneyGroup': './src/JourneyGroup/entity/JourneyGroup',
    'JourneyGroup/repository/JourneyGroupRepository': './src/JourneyGroup/repository/JourneyGroupRepository',
    'JourneyGroup/enums/JourneyGroupType': './src/JourneyGroup/enums/JourneyGroupType',

    'PrivateHireContent/entity/PrivateHireContent': './src/PrivateHireContent/entity/PrivateHireContent',
    'PrivateHireContent/repository/PrivateHireContentRepository':
      './src/PrivateHireContent/repository/PrivateHireContentRepository',

    'Page/entity/Page': './src/Page/entity/Page',
    'Page/repository/PageRepository': './src/Page/repository/PageRepository',
    'Page/enums/PageType': './src/Page/enums/PageType',
    'Page/enums/PageStatus': './src/Page/enums/PageStatus',

    'PromoCode/entity/PromoCode': './src/PromoCode/entity/PromoCode',
    'PromoCode/repository/PromoCodeRepository': './src/PromoCode/repository/PromoCodeRepository',
    'PromoCode/enums/PromoCodeUseTypes': './src/PromoCode/enums/PromoCodeUseTypes',
    'PromoCode/enums/PromoCodeTeamOptions': './src/PromoCode/enums/PromoCodeTeamOptions',
    'PromoCode/enums/PromoCodePlatformTypes': './src/PromoCode/enums/PromoCodePlatformTypes',
    'PromoCode/enums/PromoCodeLimitedToProductTypes': './src/PromoCode/enums/PromoCodeLimitedToProductTypes',

    'Product/entity/Product': './src/Product/entity/Product',
    'Product/repository/ProductRepository': './src/Product/repository/ProductRepository',
    'Product/enums/SafeguardMode': './src/Product/enums/SafeguardMode',

    'PrivateProduct/entity/PrivateProduct': './src/PrivateProduct/entity/PrivateProduct',
    'PrivateProduct/repository/PrivateProductRepository': './src/PrivateProduct/repository/PrivateProductRepository',
    'PrivateProduct/utils/getPrivateProductRelativeSlug': './src/PrivateProduct/utils/getPrivateProductRelativeSlug',

    'TravelPlan/entity/TravelPlan': './src/TravelPlan/entity/TravelPlan',
    'TravelPlan/repository/TravelPlanRepository': './src/TravelPlan/repository/TravelPlanRepository',

    'TravelProduct/entity/TravelProduct': './src/TravelProduct/entity/TravelProduct',
    'TravelProduct/repository/TravelProductRepository': './src/TravelProduct/repository/TravelProductRepository',
    'TravelProduct/enums/ProductCompletion': './src/TravelProduct/enums/ProductCompletion',

    'EventProduct/entity/EventProduct': './src/EventProduct/entity/EventProduct',
    'EventProduct/repository/EventProductRepository': './src/EventProduct/repository/EventProductRepository',
    'EventProduct/utils/getEventProductRelativeSlug': './src/EventProduct/utils/getEventProductRelativeSlug',

    'RecurringProduct/entity/RecurringProduct': './src/RecurringProduct/entity/RecurringProduct',
    'RecurringProduct/repository/RecurringProductRepository':
      './src/RecurringProduct/repository/RecurringProductRepository',
    'RecurringProduct/enums/BookableServiceConfigType': './src/RecurringProduct/enums/BookableServiceConfigType',
    'RecurringProduct/enums/PricingMatrixType': './src/RecurringProduct/enums/PricingMatrixType',

    'SupplyCost/repository/SupplyCostRepository': './src/SupplyCost/repository/SupplyCostRepository',
    'SupplyCost/enums/SupplyCostLogType': './src/SupplyCost/enums/SupplyCostLogType',

    'TravelPass/entity/TravelPass': './src/TravelPass/entity/TravelPass',
    'TravelPass/repository/TravelPassRepository': './src/TravelPass/repository/TravelPassRepository',
    'TravelPass/enums/TravelPassEnding': './src/TravelPass/enums/TravelPassEnding',
    'TravelPass/enums/TravelPassEndingWhatType': './src/TravelPass/enums/TravelPassEndingWhatType',
    'TravelPass/utils/getTravelPassRelativeSlug': './src/TravelPass/utils/getTravelPassRelativeSlug',

    'TravelStop/entity/TravelStop': './src/TravelStop/entity/TravelStop',
    'TravelStopPricing/entity/TravelStopPricing': './src/TravelStopPricing/entity/TravelStopPricing',
    'TravelStop/enums/TravelStopType': './src/TravelStop/enums/TravelStopType',

    'TravelPassStop/entity/TravelPassStop': './src/TravelPassStop/entity/TravelPassStop',

    'TravelPassStopPricing/entity/TravelPassStopPricing': './src/TravelPassStopPricing/entity/TravelPassStopPricing',

    'User/entity/User': './src/User/entity/User',
    'User/repository/UserRepository': './src/User/repository/UserRepository',
    'User/enums/UploadAllocationType': './src/User/enums/UploadAllocationType',

    'LinkedRider/entity/LinkedRider': './src/LinkedRider/entity/LinkedRider',
    'LinkedRider/repository/LinkedRiderRepository': './src/LinkedRider/repository/LinkedRiderRepository',

    'LinkedRider/entity/LinkedPass': './src/LinkedRider/entity/LinkedPass',

    'Follower/entity/Follower': './src/Follower/entity/Follower',

    'PassengerType/entity/PassengerType': './src/PassengerType/entity/PassengerType',
    'PassengerType/repository/PassengerTypeRepository': './src/PassengerType/repository/PassengerTypeRepository',

    'Vehicle/entity/Vehicle': './src/Vehicle/entity/Vehicle',
    'Vehicle/repository/VehicleRepository': './src/Vehicle/repository/VehicleRepository',
    'Vehicle/enums/VehicleType': './src/Vehicle/enums/VehicleType',
    'Vehicle/entity/VehicleCertification': './src/Vehicle/entity/VehicleCertification',

    'Payment/entity/Payment': './src/Payment/entity/Payment',
    'Payment/repository/PaymentRepository': './src/Payment/repository/PaymentRepository',
    'Payment/enums/PaymentMethod': './src/Payment/enums/PaymentMethod',
    'Payment/enums/PaymentProvider': './src/Payment/enums/PaymentProvider',

    'Transaction/entity/Transaction': './src/Transaction/entity/Transaction',
    'Transaction/enums/TransactionStatus': './src/Transaction/enums/TransactionStatus',
    'Transaction/enums/TransactionType': './src/Transaction/enums/TransactionType',

    'Tier/entity/Tier': './src/Tier/entity/Tier',
    'Tier/repository/TierRepository': './src/Tier/repository/TierRepository',

    'ThirdParty/api': './src/ThirdParty/api',

    'Notification/enums/SendNotificationType': './src/Notification/enums/SendNotificationType',

    'Business/entity/Business': './src/Business/entity/Business',
    'Business/enums/ElectricVehiclesStance': './src/Business/enums/ElectricVehiclesStance',
    'Business/enums/Euro6ComplianceType': './src/Business/enums/Euro6ComplianceType',
    'Business/enums/OCRSScore': './src/Business/enums/OCRSScore',
    'Business/enums/UnitedStatesState': './src/Business/enums/UnitedStatesState',
    'Business/enums/ServiceType': './src/Business/enums/ServiceType',
    'Business/entity/BusinessMarketDetails': './src/Business/entity/BusinessMarketDetails',
    'Business/repository/BusinessRepository': './src/Business/repository/BusinessRepository',

    'Fleet/entity/FleetOption': './src/Fleet/entity/FleetOption',
    'Fleet/repository/FleetRepository': './src/Fleet/repository/FleetRepository',

    'GeoPoint/entity/GeoPoint': './src/GeoPoint/entity/GeoPoint',

    'Contact/entity/Contact': './src/Contact/entity/Contact',

    'Address/entity/Address': './src/Address/entity/Address',

    'InternalNote/entity/InternalNote': './src/InternalNote/entity/InternalNote',

    'WaitingList/entity/WaitingList': './src/WaitingList/entity/WaitingList',
    'WaitingList/repository/WaitingListRepository': './src/WaitingList/repository/WaitingListRepository',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: ['ZloFecore'],
    libraryTarget: 'umd',
    publicPath: '/dist/',
  },
  externals: {
    axios: 'axios',
    moment: 'moment',
    'moment-timezone': 'moment-timezone',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    // alias: {
    // src: path.resolve(__dirname, 'src'),
    // },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin(), new CleanWebpackPlugin()],
};
