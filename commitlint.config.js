module.exports = {
	extends: ['@commitlint/config-conventional'],
	// 自定义以下内容,实际上就是@commitlint/config-conventional的内容，方便查看
	rules: {
		'body-leading-blank': [1, 'always'],
		'body-max-line-length': [2, 'always', 100],
		'footer-leading-blank': [1, 'always'],
		'footer-max-line-length': [2, 'always', 100],
		'header-max-length': [2, 'always', 100],
		// 提交主题大小写:[]
		// 0: level -> error
		// 1: rule  -> never
		// 3: value  -> []
		'subject-case': [
			2,
			'never',
			['sentence-case', 'start-case', 'pascal-case', 'upper-case']
		],
		// 提交主题不能为空:[]
		// 0: level -> error
		// 1: rule  -> never
		'subject-empty': [2, 'never'],
		// 提交主题后面不可以有标点符号
		// 0: level -> error
		// 1: rule  -> never
		// 2：value -> string
		'subject-full-stop': [2, 'never', '.'],
		// 提交类型大小写:[]
		// 0: level -> error
		// 1: rule  -> always
		// 3: value  -> string
		'type-case': [2, 'always', 'lower-case'],
		// 提交类型不能为空:[]
		// 0: level -> error
		// 1: rule  -> never
		'type-empty': [2, 'never'],
		// 提交类型: []
		// 0: level -> error
		// 1: rule  -> always
		// 2: value -> []
		'type-enum': [
			2,
			'always',
			[
				'build',
				'chore',
				'ci',
				'docs',
				'feat',
				'fix',
				'perf',
				'refactor',
				'revert',
				'style',
				'test'
			]
		]
	},
	prompt: {
		settings: {},
		messages: {
			skip: ':skip', // 跳过
			max: 'upper %d chars', // 上限多少字符
			min: '%d chars at least', // 下限多少字符
			emptyWarning: 'can not be empty', // 不能为空
			upperLimitWarning: 'over limit', // 超过上限
			lowerLimitWarning: 'below limit' // 低于下限
		},
		questions: {
			type: {
				// 请选择提交类型
				description: "Select the type of change that you're committing:",
				enum: {
					feat: {
						// 新增功能
						description: 'A new feature',
						title: 'Features',
						emoji: '✨'
					},
					fix: {
						// bug修复
						description: 'A bug fix',
						title: 'Bug Fixes',
						emoji: '🐛'
					},
					docs: {
						//文档
						description: 'Documentation only changes',
						title: 'Documentation',
						emoji: '📚'
					},
					style: {
						// 代码格式
						description:
							'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
						title: 'Styles',
						emoji: '💎'
					},
					refactor: {
						// 代码重构
						description:
							'A code change that neither fixes a bug nor adds a feature',
						title: 'Code Refactoring',
						emoji: '📦'
					},
					perf: {
						// 性能优化
						description: 'A code change that improves performance',
						title: 'Performance Improvements',
						emoji: '🚀'
					},
					test: {
						// 测试相关
						description: 'Adding missing tests or correcting existing tests',
						title: 'Tests',
						emoji: '🚨'
					},
					build: {
						// 构建相关
						description:
							'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
						title: 'Builds',
						emoji: '🛠'
					},
					ci: {
						// 持续集成
						description:
							'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
						title: 'Continuous Integrations',
						emoji: '⚙️'
					},
					chore: {
						// 其他杂项
						description: "Other changes that don't modify src or test files",
						title: 'Chores',
						emoji: '♻️'
					},
					revert: {
						// 代码回退
						description: 'Reverts a previous commit',
						title: 'Reverts',
						emoji: '🗑'
					}
				}
			},
			scope: {
				// 变更的范围
				description:
					'What is the scope of this change (e.g. component or file name)'
			},
			subject: {
				// 变更的主题
				description: 'Write a short, imperative tense description of the change'
			},
			body: {
				// 变更的描述
				description: 'Provide a longer description of the change'
			},
			isBreaking: {
				// 变更是否是一个breaking changes?
				description: 'Are there any breaking changes?'
			},
			breakingBody: {
				// 变更的描述
				description:
					'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself'
			},
			breaking: {
				// 描述变更的理由和迁移方法
				description: 'Describe the breaking changes'
			},
			isIssueAffected: {
				// 变更是否有关联未的issues?
				description: 'Does this change affect any open issues?'
			},
			issuesBody: {
				//
				description:
					'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself'
			},
			issues: {
				// 关联issue引用
				description: 'Add issue references (e.g. "fix #123", "re #123".)'
			}
		}
	}
};
