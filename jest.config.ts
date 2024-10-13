/**
 * 各設定プロパティの詳細な説明については、以下を参照してください：
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  // テストでインポートされたすべてのモジュールを自動的にモックする
  // automock: false,

  // `n`回の失敗後にテストの実行を停止する
  // bail: 0,

  // Jestが依存関係のキャッシュ情報を保存するディレクトリ
  // cacheDirectory: "/private/var/folders/f6/7kp74fpn7qzg97mmxjhr95600000gn/T/jest_dx",

  // 各テストの前にモックの呼び出し、インスタンス、コンテキスト、および結果を自動的にクリアする
  clearMocks: true,

  // テストの実行中にカバレッジ情報を収集するかどうかを示す
  collectCoverage: true,

  // カバレッジ情報を収集するファイルのセットを示すglobパターンの配列
  // collectCoverageFrom: undefined,

  // Jestがカバレッジファイルを出力するディレクトリ
  coverageDirectory: "coverage",

  // カバレッジの収集をスキップするために使用される正規表現パターンの配列
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // カバレッジの計測に使用するプロバイダーを指定
  coverageProvider: "v8",

  // Jestがカバレッジレポートを書き出すときに使用するレポーターの名前のリスト
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // カバレッジ結果の最小しきい値の適用を設定するオブジェクト
  // coverageThreshold: undefined,

  // カスタムの依存関係エクストラクターへのパス
  // dependencyExtractor: undefined,

  // 非推奨のAPIを呼び出すと有用なエラーメッセージを投げる
  // errorOnDeprecated: false,

  // フェイクタイマーのデフォルト設定
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // globパターンの配列を使用して、無視されたファイルからのカバレッジ収集を強制する
  // forceCoverageMatch: [],

  // すべてのテストスイートの前に一度だけトリガーされる非同期関数をエクスポートするモジュールへのパス
  // globalSetup: undefined,

  // すべてのテストスイートの後に一度だけトリガーされる非同期関数をエクスポートするモジュールへのパス
  // globalTeardown: undefined,

  // すべてのテスト環境で利用可能である必要があるグローバル変数のセット
  // globals: {},

  // テストの実行に使用される最大ワーカー数。%または数値で指定できます。例：maxWorkers: 10% は最大ワーカー数としてCPU数の10%+1を使用します。maxWorkers: 2 は最大2つのワーカーを使用します。
  // maxWorkers: "50%",

  // 要求するモジュールの場所から再帰的に上に検索されるディレクトリ名の配列
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // モジュールで使用するファイル拡張子の配列
  // moduleFileExtensions: [
  //   "js",
  //   "mjs",
  //   "cjs",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // 正規表現からモジュール名またはモジュール名の配列へのマップ。単一のモジュールでリソースをスタブアウトすることを可能にします。
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },

  // モジュールローダーが「可視」と見なす前に、すべてのモジュールパスに対してマッチされる正規表現パターンの配列
  // modulePathIgnorePatterns: [],

  // テスト結果の通知を有効化する
  // notify: false,

  // 通知モードを指定する列挙型。{ notify: true }が必要
  // notifyMode: "failure-change",

  // Jestの設定のベースとして使用されるプリセット
  // preset: undefined,

  // 1つ以上のプロジェクトからテストを実行する
  // projects: undefined,

  // カスタムレポーターをJestに追加するためにこの設定オプションを使用
  // reporters: undefined,

  // 各テストの前にモック状態を自動的にリセットする
  // resetMocks: false,

  // 各個別のテストを実行する前にモジュールレジストリをリセットする
  // resetModules: false,

  // カスタムリゾルバへのパス
  // resolver: undefined,

  // 各テストの前にモックの状態と実装を自動的に復元する
  // restoreMocks: false,

  // Jestがテストやモジュールをスキャンすべきルートディレクトリ
  // rootDir: undefined,

  // Jestがファイルを検索するために使用すべきディレクトリのパスのリスト
  // roots: [
  //   "<rootDir>"
  // ],

  // Jestのデフォルトのテストランナーの代わりにカスタムランナーを使用できるようにする
  // runner: "jest-runner",

  // 各テストの前にテスト環境を構成またはセットアップするためのコードを実行するモジュールへのパス
  // setupFiles: [],

  // 各テストの前にテストフレームワークを構成またはセットアップするためのコードを実行するモジュールへのパスのリスト
  // setupFilesAfterEnv: [],

  // テストが遅いと見なされ、結果でそのように報告されるまでの秒数
  // slowTestThreshold: 5,

  // スナップショットテストのためにJestが使用すべきスナップショットシリアライザモジュールのパスのリスト
  // snapshotSerializers: [],

  // テストに使用されるテスト環境
  testEnvironment: "jsdom",

  // 各テストを実行する前に、さらに設定オプションを追加する
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // testEnvironmentに渡されるオプション
  // testEnvironmentOptions: {},

  // テスト結果にlocationフィールドを追加する
  // testLocationInResults: false,

  // Jestがテストファイルを検出するために使用するglobパターン
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  // すべてのテストパスに対してマッチされる正規表現パターンの配列。マッチしたテストはスキップされる
  // testPathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Jestがテストファイルを検出するために使用する正規表現パターンまたはパターンの配列
  // testRegex: [],

  // カスタムの結果プロセッサを使用するためのオプション
  // testResultsProcessor: undefined,

  // カスタムのテストランナーを使用するためのオプション
  // testRunner: "jest-circus/runner",

  // 正規表現からトランスフォーマーへのパスへのマップ
  // transform: undefined,

  // すべてのソースファイルパスに対してマッチされる正規表現パターンの配列。マッチしたファイルは変換をスキップする
  // transformIgnorePatterns: [
  //   "/node_modules/",
  //   "\\.pnp\\.[^\\/]+$"
  // ],

  // モジュールローダーが自動的にモックを返す前に、すべてのモジュールに対してマッチされる正規表現パターンの配列
  // unmockedModulePathPatterns: undefined,

  // 実行中に各個別のテストを報告するかどうかを示す
  // verbose: undefined,

  // ウォッチモードでテストを再実行する前に、すべてのソースファイルパスに対してマッチされる正規表現パターンの配列
  // watchPathIgnorePatterns: [],

  // ファイルクロールにwatchmanを使用するかどうか
  // watchman: true,
};

export default config;
