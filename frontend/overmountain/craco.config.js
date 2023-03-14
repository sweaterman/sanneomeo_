const CracoAlias = require("craco-alias");

module.exports = {
    style: {
        sass: {
          loaderOptions: {
            additionalData: `
              @import "@/styles/_variable.scss";
              @import "@/styles/_mixin.scss";
            `
          }
        }
      },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig", // 기본 설정파일 소스로 jsconfig, tsconfig 선택가능. 기본값은 options.
        tsConfigPath: "tsconfig.paths.json", // source가 tsconfig인 경우, paths.json 경로 설정파일을 적어준다.
      },
    },
  ],
};