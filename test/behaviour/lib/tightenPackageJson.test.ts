import { tightenPackageJson } from '$/lib/tightenPackageJson';
import { PackageJson } from '$/types';

describe('tightenPackageJson', () => {
  it('should return same object with input object if its properties does not include properties with variation', () => {
    const testJson0 = {
      name: 'test-me-if-you-can',
      version: '5.4.3',
    };
    expect(tightenPackageJson(testJson0)).toEqual(testJson0);

    const testJson1 = {
      name: 'other-example-package',
      version: '0.30.1',
      description: 'Example package have a description',
      dependencies: {
        'typescript': '301.24.3',
      },
    };
    expect(tightenPackageJson(testJson1)).toEqual(testJson1);

    const testJson2 = {
      name: 'oh-my-god',
      version: '15.4.2',
      homepage: 'https://my-homepage.world-is-world.com',
      files: [
        'dist',
        'src',
      ],
    };
    expect(tightenPackageJson(testJson2)).toEqual(testJson2);
  });

  it('should return an object with more strict bugs field', () => {
    const testInputJson0: PackageJson = {
      name: 'watashi',
      version: '5.7.1',
      bugs: 'https://this-is-url-for-bugs.com/',
    };
    const testOutputJson0: PackageJson.Normalized = {
      name: 'watashi',
      version: '5.7.1',
      bugs: {
        url: 'https://this-is-url-for-bugs.com/',
      },
    };
    expect(tightenPackageJson(testInputJson0)).toEqual(testOutputJson0);
  });

  it('should return an object with more strict author field', () => {
    const testInputJson0: PackageJson = {
      name: 'watashi',
      version: '5.7.1',
      author: 'Some One Name <some.name@everymail.xyz>',
    };
    const testOutputJson0: PackageJson.Normalized = {
      name: 'watashi',
      version: '5.7.1',
      author: {
        name: 'Some One Name',
        email: 'some.name@everymail.xyz',
      },
    };
    expect(tightenPackageJson(testInputJson0)).toEqual(testOutputJson0);

    const testInputJson1: PackageJson = {
      name: 'watashi',
      version: '5.7.1',
      author: 'Some One Name (https://watashi.github.io)',
    };
    const testOutputJson1: PackageJson.Normalized = {
      name: 'watashi',
      version: '5.7.1',
      author: {
        name: 'Some One Name',
        url: 'https://watashi.github.io',
      },
    };
    expect(tightenPackageJson(testInputJson1)).toEqual(testOutputJson1);

    const testInputJson2: PackageJson = {
      name: 'watashi',
      version: '5.7.1',
      author: 'This Is Weird <weird>man@weird.nation.xyz> (https://more.pages.here)',
    };
    const testOutputJson2: PackageJson.Normalized = {
      name: 'watashi',
      version: '5.7.1',
      author: {
        name: 'This Is Weird',
        email: 'weird>man@weird.nation.xyz',
        url: 'https://more.pages.here',
      },
    };
    expect(tightenPackageJson(testInputJson2)).toEqual(testOutputJson2);

    const testInputJson3: PackageJson = {
      name: 'watashi',
      version: '5.7.1',
      author: 'Don Do That <where-are-<you>@stop-that().ca> (https://page.is.here/(hidden))',
    };
    const testOutputJson3: PackageJson.Normalized = {
      name: 'watashi',
      version: '5.7.1',
      author: {
        name: 'Don Do That',
        email: 'where-are-<you>@stop-that().ca',
        url: 'https://page.is.here/(hidden)',
      },
    };
    expect(tightenPackageJson(testInputJson3)).toEqual(testOutputJson3);
  });

  it('should return an object with more strict contributors fields', () => {
    const testInputJson0: PackageJson = {
      name: 'watashi',
      version: '5.7.1',
      contributors: [
        {
          name: 'I am strict',
          email: 'iamstrict@hithere.com',
          url: 'https://hithere.com',
        },
        'There Is A Hacker <iam@hacker.com> (https://do.not.access-this-page.com/did-you?)',
      ],
    };
    const testOutputJson0: PackageJson.Normalized = {
      name: 'watashi',
      version: '5.7.1',
      contributors: [
        {
          name: 'I am strict',
          email: 'iamstrict@hithere.com',
          url: 'https://hithere.com',
        },
        {
          name: 'There Is A Hacker',
          email: 'iam@hacker.com',
          url: 'https://do.not.access-this-page.com/did-you?',
        },
      ],
    };
    expect(tightenPackageJson(testInputJson0)).toEqual(testOutputJson0);
  });

  it('should return an object with more strict bin fields', () => {
    const testInputJson0: PackageJson = {
      name: 'watashi',
      version: '5.7.1',
      bin: './test-case.js',
    };
    const testOutputJson0: PackageJson.Normalized = {
      name: 'watashi',
      version: '5.7.1',
      bin: {
        'watashi': './test-case.js',
      },
    };
    expect(tightenPackageJson(testInputJson0)).toEqual(testOutputJson0);
  });

  it('should return an object with more strict man fields', () => {
    const testInputJson0: PackageJson = {
      name: 'where',
      version: '20.1.3',
      man: 'abc.man',
    };
    const testOutputJson0: PackageJson.Normalized = {
      name: 'where',
      version: '20.1.3',
      man: ['abc.man'],
    };
    expect(tightenPackageJson(testInputJson0)).toEqual(testOutputJson0);
  });

  it('should return an object with more strict repository fields', () => {
    const testInputJson0: PackageJson = {
      name: 'hello-there',
      version: '12.4.3',
      repository: 'user/repo',
    };
    const testOutputJson0: PackageJson.Normalized = {
      name: 'hello-there',
      version: '12.4.3',
      repository: {
        type: 'git',
        url: 'git+https://github.com/user/repo.git',
      },
    };
    expect(tightenPackageJson(testInputJson0)).toEqual(testOutputJson0);

    const testInputJson1: PackageJson = {
      name: 'hello-there',
      version: '12.4.3',
      repository: 'github:user/repo',
    };
    const testOutputJson1: PackageJson.Normalized = {
      name: 'hello-there',
      version: '12.4.3',
      repository: {
        type: 'git',
        url: 'git+https://github.com/user/repo.git',
      },
    };
    expect(tightenPackageJson(testInputJson1)).toEqual(testOutputJson1);

    const testInputJson2: PackageJson = {
      name: 'hello-there',
      version: '12.4.3',
      repository: 'gist:11081aaa281',
    };
    const testOutputJson2: PackageJson.Normalized = {
      name: 'hello-there',
      version: '12.4.3',
      repository: {
        type: 'git',
        url: 'git+https://gist.github.com/11081aaa281.git',
      },
    };
    expect(tightenPackageJson(testInputJson2)).toEqual(testOutputJson2);
  });
});
